package account

import (
	"context"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetAccountsById(ctx context.Context, accountId []string) ([]*Account, error)
	GetAccountById(ctx context.Context, accountId string) (*Account, error)
	GetAccountByEmail(ctx context.Context, email string) (*Account, error)
	CreateAccount(ctx context.Context, account *Account) error
	UpdateAccount(ctx context.Context, accountId string, updateFn func(account *Account) error) (*Account, error)
	UpdateAccountMakeEmailPrimary(ctx context.Context, requester *principal.Principal, accountId string, updateFn func(account *Account, emails []*Email) error) (*Account, *Email, error)

	UpdateAccountDeleting(ctx context.Context, accountId string, updateFn func(account *Account) error) (*Account, error)
	UpdateAccountDeleted(ctx context.Context, accountId string, updateFn func(account *Account) error) (*Account, error)

	GetAccountByUsername(ctx context.Context, username string) (*Account, error)
	UpdateAccountUsername(ctx context.Context, requester *principal.Principal, accountId string, updateFn func(account *Account) error) (*Account, error)

	CreateAccountEmail(ctx context.Context, requester *principal.Principal, email *Email) error
	GetAccountEmails(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*Email, error)
	GetAccountEmail(ctx context.Context, requester *principal.Principal, accountId string, email string) (*Email, error)
	DeleteAccountEmail(ctx context.Context, requester *principal.Principal, accountId string, email string) error

	DeleteAccountData(ctx context.Context, accountId string) error

	CreateAccountRecoveryCodes(ctx context.Context, requester *principal.Principal, accountId string, recoveryCodes []*RecoveryCode) error
	GetAccountRecoveryCodes(ctx context.Context, requester *principal.Principal, accountId string) ([]*RecoveryCode, error)
	HasAccountRecoveryCodes(ctx context.Context, requester *principal.Principal, accountId string) (bool, error)
	VerifyAccountRecoveryCode(ctx context.Context, accountId string, recoveryCode *RecoveryCode) error

	GetAccountMultiFactorTOTP(ctx context.Context, accountId string) (*TOTP, error)
	CreateAccountMultiFactorTOTP(ctx context.Context, requester *principal.Principal, account *Account, totp *TOTP) error
	DeleteAccountMultiFactorTOTP(ctx context.Context, requester *principal.Principal, account *Account) error
}
