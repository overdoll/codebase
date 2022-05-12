package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/eva/internal/domain/account"
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

// CreateAccountRecoveryCodes - create recovery codes for the account
func (r AccountCassandraRepository) CreateAccountRecoveryCodes(ctx context.Context, requester *principal.Principal, accountId string, codes []*account.RecoveryCode) error {

	if err := account.CanCreateRecoveryCodesForAccount(requester, accountId); err != nil {
		return err
	}

	// delete all current MFA codes

	if err := qb.Delete(accountMultiFactorRecoveryCodeTable.Name()).
		Where(qb.Eq("account_id")).
		Query(r.session).
		WithContext(ctx).
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
func (r AccountCassandraRepository) GetAccountRecoveryCodes(ctx context.Context, requester *principal.Principal, accountId string) ([]*account.RecoveryCode, error) {

	if err := account.CanViewRecoveryCodesForAccount(requester, accountId); err != nil {
		return nil, err
	}

	var recoveryCodes []*accountMultiFactorRecoveryCodes

	if err := r.session.
		Query(accountMultiFactorRecoveryCodeTable.Select()).
		WithContext(ctx).
		BindStruct(&accountMultiFactorRecoveryCodes{
			AccountId: accountId,
		}).
		SelectRelease(&recoveryCodes); err != nil {
		return nil, fmt.Errorf("failed to get recovery codes for account: %v", err)
	}

	var codes []*account.RecoveryCode

	for _, cd := range recoveryCodes {
		decryptedCode, err := crypt.Decrypt(cd.Code)

		if err != nil {
			return nil, fmt.Errorf("failed to decrypt recovery codes for account: %v", err)
		}

		codes = append(codes, account.UnmarshalRecoveryCodeFromDatabase(decryptedCode))
	}

	return codes, nil
}

func (r AccountCassandraRepository) HasAccountRecoveryCodes(ctx context.Context, requester *principal.Principal, accountId string) (bool, error) {

	if err := account.CanViewRecoveryCodesForAccount(requester, accountId); err != nil {
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
		WithContext(ctx).
		BindStruct(&accountMultiFactorRecoveryCodes{
			AccountId: accountId,
		}).
		GetRelease(&recoveryCodesCounts); err != nil {
		return false, fmt.Errorf("failed to get recovery codes for account: %v", err)
	}

	return recoveryCodesCounts.Count > 0, nil
}

// VerifyAccountRecoveryCode - redeem recovery code - basically just deletes the recovery code from the database
func (r AccountCassandraRepository) VerifyAccountRecoveryCode(ctx context.Context, accountId string, recoveryCode *account.RecoveryCode) error {

	// get all recovery codes for this account
	var recoveryCodes []*accountMultiFactorRecoveryCodes

	if err := r.session.
		Query(accountMultiFactorRecoveryCodeTable.Select()).
		WithContext(ctx).
		BindStruct(&accountMultiFactorRecoveryCodes{
			AccountId: accountId,
		}).
		SelectRelease(&recoveryCodes); err != nil {
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
		return account.ErrRecoveryCodeInvalid
	}

	if err := r.session.
		Query(accountMultiFactorRecoveryCodeTable.Delete()).
		WithContext(ctx).
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
func (r AccountCassandraRepository) GetAccountMultiFactorTOTP(ctx context.Context, accountId string) (*account.TOTP, error) {

	var multiTOTP accountMultiFactorTOTP

	if err := r.session.
		Query(accountMultiFactorTotpTable.Get()).
		WithContext(ctx).
		BindStruct(&accountMultiFactorTOTP{
			AccountId: accountId,
		}).
		GetRelease(&multiTOTP); err != nil {

		if err == gocql.ErrNotFound {
			return nil, account.ErrTOTPNotConfigured
		}

		return nil, fmt.Errorf("failed to get MFA TOTP: %v", err)
	}

	decryptedOTP, err := crypt.Decrypt(multiTOTP.Secret)

	if err != nil {
		return nil, fmt.Errorf("failed to decrypt TOTP secret: %v", err)
	}

	return account.UnmarshalTOTPFromDatabase(decryptedOTP), nil
}

// CreateAccountMultiFactorTOTP - create MFA for user
func (r AccountCassandraRepository) CreateAccountMultiFactorTOTP(ctx context.Context, requester *principal.Principal, acc *account.Account, totp *account.TOTP) error {

	if err := account.CanCreateTOTPForAccount(requester, acc); err != nil {
		return err
	}

	encryptedOTP, err := crypt.Encrypt(totp.Secret())

	if err != nil {
		return fmt.Errorf("failed to encrypt MFA TOTP: %v", err)
	}

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	stmt, _ := accountMultiFactorTotpTable.Insert()

	batch.Query(stmt, acc.ID(), encryptedOTP)

	stmt, _ = accountTable.Update("multi_factor_enabled")

	batch.Query(stmt, acc.ID(), true)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to create multi factor account: %v", err)
	}

	return nil
}

func (r AccountCassandraRepository) DeleteAccountMultiFactorTOTP(ctx context.Context, requester *principal.Principal, acc *account.Account) error {

	if err := account.CanDeleteTOTPForAccount(requester, acc); err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	stmt, _ := accountMultiFactorTotpTable.Delete()

	batch.Query(stmt, acc.ID())

	stmt, _ = accountTable.Update("multi_factor_enabled")

	batch.Query(stmt, acc.ID(), false)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to delete multi factor account: %v", err)
	}

	return nil
}
