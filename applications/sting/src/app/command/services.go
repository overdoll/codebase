package command

import (
	"context"

	"overdoll/libraries/user"
)

type EvaService interface {
	GetUser(context.Context, string) (*user.User, error)
	CreateUser(context.Context, string, string) (*user.User, error)
}

type ParleyService interface {
	GetNextModeratorId(context.Context) (string, error)
}
