package user

import (
	"context"

	"overdoll/libraries/ksuid"
)

type Repository interface {
	GetUserById(ctx context.Context, id ksuid.UUID)
	DeleteCookieById(ctx context.Context, id ksuid.UUID)
	GetUserByEmail(ctx context.Context, email string)
	CreateUser(ctx context.Context, instance *User)
}
