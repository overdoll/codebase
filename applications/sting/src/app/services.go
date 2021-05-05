package app

import (
	"context"

	"overdoll/libraries/user"
)

type EvaService interface {
	GetUser(ctx context.Context, id string) (*common.User, error)
}
