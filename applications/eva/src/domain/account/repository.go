package account

import (
	"context"

	"overdoll/libraries/paging"
)

type Repository interface {
	GetAccountById(context.Context, string) (*Account, error)
	GetAccountByEmail(context.Context, string) (*Account, error)
	CreateAccount(context.Context, *Account) error
	UpdateAccount(context.Context, string, func(*Account) error) (*Account, error)
	UpdateAccountMakeEmailPrimary(context.Context, string, func(*Account, []*Email) error) (*Account, *Email, error)

	GetAccountByUsername(context.Context, string) (*Account, error)
	GetAccountUsername(context.Context, string, string) (*Username, error)
	UpdateAccountUsername(context.Context, string, func(*Account) error) (*Account, *Username, error)
	GetAccountUsernames(context.Context, *paging.Cursor, string) ([]*Username, *paging.Info, error)

	AddAccountEmail(context.Context, *Account, *EmailConfirmation) (*Email, error)
	ConfirmAccountEmail(context.Context, string, *Account) (*Email, error)
	GetAccountEmails(context.Context, *paging.Cursor, string) ([]*Email, *paging.Info, error)
	GetAccountEmail(context.Context, string, string) (*Email, error)
	DeleteAccountEmail(context.Context, string, string) error
}
