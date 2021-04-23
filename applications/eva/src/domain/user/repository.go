package user

import (
	"context"

	"overdoll/libraries/ksuid"
)

type Repository interface {
	GetUserById(context.Context, ksuid.UUID) (*User, error)
	GetUserByEmail(context.Context, string) (*User, error)
	CreateUser(context.Context, *User) error
}
