package query

import (
	"context"

	"overdoll/libraries/user"
)

type EvaService interface {
	GetUser(ctx context.Context, id string) (*user.User, error)
}
