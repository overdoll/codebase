package app

import (
	"context"

	"overdoll/libraries/user"
)

type EvaService interface {
	ValidateSession(context.Context, string) (*common.User, error)
}
