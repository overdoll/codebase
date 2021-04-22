package user

import (
	"context"

	"overdoll/libraries/ksuid"
)

type Repository interface {
	GetUserById(ctx context.Context, id ksuid.UUID) (*User, error)
	GetUserByEmail(ctx context.Context, email string) (*User, error)
	CreateUser(ctx context.Context, instance *User) error
}
