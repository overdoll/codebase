package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/libraries/crypt"
	"overdoll/libraries/principal"
)

var accountMultiFactorTotpTable = table.New(table.Metadata{
	Name: "account_multi_factor_totp",
	Columns: []string{
		"account_id",
		"secret",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{},
})

type accountMultiFactorTOTP struct {
	AccountId string `db:"account_id"`
	Secret    string `db:"secret"`
}

var accountMultiFactorRecoveryCodeTable = table.New(table.Metadata{
	Name: "account_multi_factor_recovery_codes",
	Columns: []string{
		"account_id",
		"code",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"code"},
})

type accountMultiFactorRecoveryCodes struct {
	AccountId string `db:"account_id"`
	Code      string `db:"code"`
}

type MultiFactorCassandraRepository struct {
	session gocqlx.Session
}

func NewMultiFactorCassandraRepository(session gocqlx.Session) MultiFactorCassandraRepository {
	return MultiFactorCassandraRepository{session: session}
}

// CreateAccountRecoveryCodes - create recovery codes for the account
func (r MultiFactorCassandraRepository) CreateAccountRecoveryCodes(ctx context.Context, requester *principal.Principal, accountId string, codes []*multi_factor.RecoveryCode) error {

	if err := multi_factor.CanCreateRecoveryCodesForAccount(requester, accountId); err != nil {
		return err
	}

	// delete all current MFA codes

	if err := qb.Delete(accountMultiFactorRecoveryCodeTable.Name()).
		Where(qb.Eq("account_id")).
		Query(r.session).
		BindStruct(&accountMultiFactorRecoveryCodes{
			AccountId: accountId,
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete recovery codes: %v", err)
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// insert recovery codes
	for _, code := range codes {
		stmt, _ := accountMultiFactorRecoveryCodeTable.Insert()

		encrypt, err := crypt.Encrypt(code.Code())

		if err != nil {
			return fmt.Errorf("failed to encrypt recovery code: %v", err)
		}

		batch.Query(stmt, accountId, encrypt)
	}

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to create new recovery code set: %v", err)
	}

	return nil
}

// GetAccountRecoveryCodes - get account recovery codes
func (r MultiFactorCassandraRepository) GetAccountRecoveryCodes(ctx context.Context, requester *principal.Principal, accountId string) ([]*multi_factor.RecoveryCode, error) {

	if err := multi_factor.CanViewRecoveryCodesForAccount(requester, accountId); err != nil {
		return nil, err
	}

	var recoveryCodes []*accountMultiFactorRecoveryCodes

	if err := r.session.
		Query(accountMultiFactorRecoveryCodeTable.Select()).
		BindStruct(&accountMultiFactorRecoveryCodes{
			AccountId: accountId,
		}).
		Select(&recoveryCodes); err != nil {
		return nil, fmt.Errorf("failed to get recovery codes for account: %v", err)
	}

	var codes []*multi_factor.RecoveryCode

	for _, cd := range recoveryCodes {
		decryptedCode, err := crypt.Decrypt(cd.Code)

		if err != nil {
			return nil, fmt.Errorf("failed to decrypt recovery codes for account: %v", err)
		}

		codes = append(codes, multi_factor.UnmarshalRecoveryCodeFromDatabase(decryptedCode))
	}

	return codes, nil
}

func (r MultiFactorCassandraRepository) HasAccountRecoveryCodes(ctx context.Context, requester *principal.Principal, accountId string) (bool, error) {

	if err := multi_factor.CanViewRecoveryCodesForAccount(requester, accountId); err != nil {
		return false, err
	}

	type recoveryCodesCount struct {
		Count int `db:"count"`
	}

	var recoveryCodesCounts recoveryCodesCount

	if err := accountMultiFactorRecoveryCodeTable.
		SelectBuilder().
		CountAll().
		Query(r.session).
		BindStruct(&accountMultiFactorRecoveryCodes{
			AccountId: accountId,
		}).
		Get(&recoveryCodesCounts); err != nil {
		return false, fmt.Errorf("failed to get recovery codes for account: %v", err)
	}

	return recoveryCodesCounts.Count > 0, nil
}

// VerifyAccountRecoveryCode - redeem recovery code - basically just deletes the recovery code from the database
func (r MultiFactorCassandraRepository) VerifyAccountRecoveryCode(ctx context.Context, accountId string, recoveryCode *multi_factor.RecoveryCode) error {

	// get all recovery codes for this account
	var recoveryCodes []*accountMultiFactorRecoveryCodes

	if err := r.session.
		Query(accountMultiFactorRecoveryCodeTable.Select()).
		BindStruct(&accountMultiFactorRecoveryCodes{
			AccountId: accountId,
		}).
		Select(&recoveryCodes); err != nil {
		return fmt.Errorf("failed to get recovery codes for account: %v", err)
	}

	var foundCode *accountMultiFactorRecoveryCodes

	// go through each recover code, decrypt and figure out if it matches
	for _, cd := range recoveryCodes {
		decryptedCode, err := crypt.Decrypt(cd.Code)

		if err != nil {
			return fmt.Errorf("failed to decrypt recovery codes for account: %v", err)
		}

		// if recovery code matches, make it part of our codes
		if decryptedCode == recoveryCode.Code() {
			foundCode = cd
			break
		}
	}

	if foundCode == nil {
		return multi_factor.ErrRecoveryCodeInvalid
	}

	if err := r.session.
		Query(accountMultiFactorRecoveryCodeTable.Delete()).
		BindStruct(&accountMultiFactorRecoveryCodes{
			AccountId: accountId,
			Code:      foundCode.Code,
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to verify recovery code: %v", err)
	}

	return nil
}

// GetAccountMultiFactorTOTP - get TOTP associated with account
func (r MultiFactorCassandraRepository) GetAccountMultiFactorTOTP(ctx context.Context, accountId string) (*multi_factor.TOTP, error) {

	var multiTOTP accountMultiFactorTOTP

	if err := r.session.
		Query(accountMultiFactorTotpTable.Get()).
		BindStruct(&accountMultiFactorTOTP{
			AccountId: accountId,
		}).
		Get(&multiTOTP); err != nil {

		if err == gocql.ErrNotFound {
			return nil, multi_factor.ErrTOTPNotConfigured
		}

		return nil, fmt.Errorf("failed to get MFA TOTP: %v", err)
	}

	decryptedOTP, err := crypt.Decrypt(multiTOTP.Secret)

	if err != nil {
		return nil, fmt.Errorf("failed to decrypt TOTP secret: %v", err)
	}

	return multi_factor.UnmarshalTOTPFromDatabase(decryptedOTP), nil
}

// CreateAccountMultiFactorTOTP - create MFA for user
func (r MultiFactorCassandraRepository) CreateAccountMultiFactorTOTP(ctx context.Context, requester *principal.Principal, accountId string, totp *multi_factor.TOTP) error {

	if err := multi_factor.CanCreateTOTPForAccount(requester, accountId); err != nil {
		return err
	}

	encryptedOTP, err := crypt.Encrypt(totp.Secret())

	if err != nil {
		return fmt.Errorf("failed to encrypt MFA TOTP: %v", err)
	}

	if err := r.session.
		Query(accountMultiFactorTotpTable.Insert()).
		BindStruct(&accountMultiFactorTOTP{
			AccountId: accountId,
			Secret:    encryptedOTP,
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to create MFA TOTP: %v", err)
	}

	return nil
}

func (r MultiFactorCassandraRepository) DeleteAccountMultiFactorTOTP(ctx context.Context, requester *principal.Principal, accountId string) error {

	if err := multi_factor.CanDeleteTOTPForAccount(requester, accountId); err != nil {
		return err
	}

	if err := r.session.
		Query(accountMultiFactorTotpTable.Delete()).
		BindStruct(&accountMultiFactorTOTP{
			AccountId: accountId,
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete MFA TOTP: %v", err)
	}

	return nil
}

func (r MultiFactorCassandraRepository) DeleteAccountData(ctx context.Context, accountId string) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := accountMultiFactorRecoveryCodeTable.Delete()

	batch.Query(stmt, accountId)

	stmt, _ = accountMultiFactorTotpTable.Delete()

	batch.Query(stmt, accountId)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to delete multi factor account data: %v", err)
	}

	return nil
}
