package command

import (
	"context"

	"overdoll/libraries/user"
)

type EvaService interface {
	GetUser(ctx context.Context, id string) (*user.User, error)
	CreateUser(ctx context.Context, username string, email string) (*user.User, error)
}

type ParleyService interface {
	GetNextModeratorId(ctx context.Context) (string, error)
}
