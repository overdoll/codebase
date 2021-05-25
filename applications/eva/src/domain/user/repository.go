package user

import (
	"context"
)

type Repository interface {
	GetUserById(context.Context, string) (*User, error)
	GetUserByEmail(context.Context, string) (*User, error)
	CreateUser(context.Context, *User) error
}
