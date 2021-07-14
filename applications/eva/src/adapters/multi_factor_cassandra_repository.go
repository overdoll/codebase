package adapters

import (
	"context"
	"fmt"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/eva/src/domain/multi_factor"
	"overdoll/libraries/crypt"
)

type AccountMultiFactorTOTP struct {
	AccountId string `db:"account_id"`
	Secret    string `db:"secret"`
}

type AccountMultiFactorRecoveryCodes struct {
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
func (r MultiFactorCassandraRepository) CreateAccountRecoveryCodes(ctx context.Context, accountId string, codes []*multi_factor.RecoveryCode) error {

	// delete all current MFA codes
	deleteOldCodes := qb.Delete("account_multi_factor_recovery_codes").
		Where(qb.Eq("account_id")).
		Query(r.session).
		BindStruct(&AccountMultiFactorRecoveryCodes{
			AccountId: accountId,
		})

	if err := deleteOldCodes.ExecRelease(); err != nil {
		return fmt.Errorf("delete() failed: %s", err)
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// insert recovery codes
	for _, code := range codes {
		qCodes := qb.Insert("account_multi_factor_recovery_codes").
			Columns("account_id", "code")

		stmt, _ := qCodes.ToCql()

		encrypt, err := crypt.Encrypt(code.Code())

		if err != nil {
			return err
		}

		batch.Query(stmt, accountId, encrypt)
	}

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("batch() failed: %s", err)
	}

	return nil
}

// GetAccountRecoveryCodes - get account recovery codes
func (r MultiFactorCassandraRepository) GetAccountRecoveryCodes(ctx context.Context, accountId string) ([]*multi_factor.RecoveryCode, error) {

	var recoveryCodes []*AccountMultiFactorRecoveryCodes

	// insert recovery codes
	getAccountMultiFactorRecoveryCodes := qb.Select("account_multi_factor_recovery_codes").
		Where(qb.Eq("account_id")).
		Columns("account_id", "code").
		Query(r.session).
		BindStruct(&AccountMultiFactorRecoveryCodes{
			AccountId: accountId,
		})

	if err := getAccountMultiFactorRecoveryCodes.Select(&recoveryCodes); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	var codes []*multi_factor.RecoveryCode

	for _, cd := range recoveryCodes {
		decryptedCode, err := crypt.Decrypt(cd.Code)

		if err != nil {
			return nil, err
		}

		codes = append(codes, multi_factor.UnmarshalRecoveryCodeFromDatabase(decryptedCode))
	}

	return codes, nil
}

// RedeemAccountRecoveryCode - redeem recovery code - basically just deletes the recovery code from the database
func (r MultiFactorCassandraRepository) RedeemAccountRecoveryCode(ctx context.Context, accountId string, recoveryCode *multi_factor.RecoveryCode) error {

	encryptedCode, err := crypt.Encrypt(recoveryCode.Code())

	if err != nil {
		return err
	}

	deleteAccountMultiFactorCodes := qb.Delete("account_multi_factor_recovery_codes").
		Where(qb.Eq("account_id"), qb.Eq("code")).
		Query(r.session).
		BindStruct(&AccountMultiFactorRecoveryCodes{
			AccountId: accountId,
			Code:      encryptedCode,
		})

	if err := deleteAccountMultiFactorCodes.ExecRelease(); err != nil {

		if err == gocql.ErrNotFound {
			return multi_factor.ErrRecoveryCodeInvalid
		}

		return fmt.Errorf("delete() failed: '%s", err)
	}

	return nil
}

// GetAccountMultiFactorTOTP - get TOTP associated with account
func (r MultiFactorCassandraRepository) GetAccountMultiFactorTOTP(ctx context.Context, accountId string) (*multi_factor.TOTP, error) {

	var multiTOTP AccountMultiFactorTOTP

	getMultiFactorTOTP := qb.Select("account_multi_factor_totp").
		Columns("account_id", "secret").
		Where(qb.Eq("account_id")).
		Query(r.session).
		BindStruct(&AccountMultiFactorTOTP{
			AccountId: accountId,
		})

	if err := getMultiFactorTOTP.Get(&multiTOTP); err != nil {

		if err == gocql.ErrNotFound {
			return nil, multi_factor.ErrTOTPNotConfigured
		}

		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	decryptedOTP, err := crypt.Decrypt(multiTOTP.Secret)
	if err != nil {
		return nil, err
	}

	return multi_factor.UnmarshalTOTPFromDatabase(decryptedOTP), nil
}

// CreateAccountMultiFactorTOTP - create MFA for user
func (r MultiFactorCassandraRepository) CreateAccountMultiFactorTOTP(ctx context.Context, accountId string, totp *multi_factor.TOTP) error {

	encryptedOTP, err := crypt.Encrypt(totp.Secret())

	if err != nil {
		return err
	}

	createMultiFactorTOTP := qb.Insert("account_multi_factor_totp").
		Columns("account_id", "secret").
		Query(r.session).
		BindStruct(&AccountMultiFactorTOTP{
			AccountId: accountId,
			Secret:    encryptedOTP,
		})

	if err := createMultiFactorTOTP.ExecRelease(); err != nil {
		return fmt.Errorf("insert() failed: '%s", err)
	}

	return nil
}

func (r MultiFactorCassandraRepository) DeleteAccountMultiFactorTOTP(ctx context.Context, accountId string) error {

	deleteMultiFactorTOTP := qb.Delete("account_multi_factor_totp").
		Where(qb.Eq("account_id")).
		Query(r.session).
		BindStruct(&AccountMultiFactorTOTP{
			AccountId: accountId,
		})

	if err := deleteMultiFactorTOTP.ExecRelease(); err != nil {
		return fmt.Errorf("delete() failed: '%s", err)
	}

	return nil
}
