package user

import (
	"context"
)

type Repository interface {
	GetUserById(context.Context, string) (*User, error)
	GetUserByEmail(context.Context, string) (*User, error)
	CreateUser(context.Context, *User) error
	UpdateUser(context.Context, string, func(*User) error) (*User, error)
}
