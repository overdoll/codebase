package command

import (
	"context"

	"overdoll/libraries/principal"
)

type EvaService interface {
	GetAccount(context.Context, string) (*principal.Principal, error)
	CreateAccount(context.Context, string, string) (*principal.Principal, error)
}

type ParleyService interface {
	GetNextModeratorId(context.Context) (string, error)
}
