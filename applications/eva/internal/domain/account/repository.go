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

	GetAccountByUsername(ctx context.Context, username string) (*Account, error)
	UpdateAccountUsername(ctx context.Context, requester *principal.Principal, accountId string, updateFn func(account *Account) error) (*Account, error)

	AddAccountEmail(ctx context.Context, account *Account, emailConfirmation *EmailConfirmation) (*Email, error)
	ConfirmAccountEmail(ctx context.Context, requester *principal.Principal, email string) (*Email, error)
	GetAccountEmails(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*Email, error)
	GetAccountEmail(ctx context.Context, requester *principal.Principal, accountId string, email string) (*Email, error)
	DeleteAccountEmail(ctx context.Context, requester *principal.Principal, accountId string, email string) error
}

type IndexRepository interface {
	SearchAccounts(ctx context.Context, cursor *paging.Cursor, username string) ([]*Account, error)
	IndexAllAccounts(ctx context.Context) error
	DeleteAccountIndex(ctx context.Context) error
}
