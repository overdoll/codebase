package app

import (
	"context"

	"overdoll/libraries/common"
)

type EvaService interface {
	ValidateSession(context.Context, string) (*common.User, error)
	RevokeSession(context.Context, string) error
}
