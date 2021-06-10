package query

import (
	"context"

	"overdoll/libraries/user"
)

type EvaService interface {
	GetUser(context.Context, string) (*user.User, error)
}
