package app

import (
	"context"

	"overdoll/libraries/common"
)

type EvaService interface {
	GetUser(ctx context.Context, id string) (*common.User, error)
}
