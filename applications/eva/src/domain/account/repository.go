package account

import (
	"context"
)

type Repository interface {
	GetAccountById(context.Context, string) (*Account, error)
	GetAccountByEmail(context.Context, string) (*Account, error)
	CreateAccount(context.Context, *Account) error
	UpdateAccount(context.Context, string, func(*Account) error) (*Account, error)

	AddAccountEmail(context.Context, *Account, *EmailConfirmation) error
	ConfirmAccountEmail(context.Context, string, *Account) error
	GetAccountEmails(context.Context, *Account) ([]*Email, error)
}
