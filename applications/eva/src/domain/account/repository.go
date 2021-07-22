package account

import (
	"context"

	"overdoll/libraries/paging"
)

type Repository interface {
	GetAccountsById(ctx context.Context, accountId []string) ([]*Account, error)
	GetAccountById(ctx context.Context, accountId string) (*Account, error)
	GetAccountByEmail(ctx context.Context, email string) (*Account, error)
	CreateAccount(ctx context.Context, account *Account) error
	UpdateAccount(ctx context.Context, accountId string, updateFn func(account *Account) error) (*Account, error)
	UpdateAccountMakeEmailPrimary(ctx context.Context, accountId string, updateFn func(account *Account, emails []*Email) error) (*Account, *Email, error)

	GetAccountByUsername(ctx context.Context, username string) (*Account, error)
	GetAccountUsername(ctx context.Context, accountId, username string) (*Username, error)
	UpdateAccountUsername(ctx context.Context, accountId string, updateFn func(account *Account) error) (*Account, *Username, error)
	GetAccountUsernames(ctx context.Context, cursor *paging.Cursor, accountId string) ([]*Username, error)

	AddAccountEmail(ctx context.Context, account *Account, emailConfirmation *EmailConfirmation) (*Email, error)
	ConfirmAccountEmail(ctx context.Context, email string, account *Account) (*Email, error)
	GetAccountEmails(ctx context.Context, cursor *paging.Cursor, accountId string) ([]*Email, error)
	GetAccountEmail(ctx context.Context, accountId string, email string) (*Email, error)
	DeleteAccountEmail(ctx context.Context, accountId string, email string) error
}

type IndexRepository interface {
	SearchAccounts(ctx context.Context, cursor *paging.Cursor, username string, artist bool) ([]*Account, error)
	IndexAllAccounts(ctx context.Context) error
	DeleteAccountIndex(ctx context.Context) error
}
