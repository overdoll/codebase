package account

import (
	"context"
)

type Repository interface {
	GetAccountById(context.Context, string) (*Account, error)
	GetAccountByEmail(context.Context, string) (*Account, error)
	CreateAccount(context.Context, *Account) error
	UpdateAccount(context.Context, string, func(*Account) error) (*Account, error)
}
