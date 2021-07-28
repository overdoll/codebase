package command

import (
	"context"

	"overdoll/libraries/account"
	"overdoll/libraries/principal"
)

type EvaService interface {
	GetAccount(context.Context, string) (*principal.Principal, error)
	CreateAccount(context.Context, string, string) (*account.Account, error)
}

type ParleyService interface {
	GetNextModeratorId(context.Context) (string, error)
}
