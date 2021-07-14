package command

import (
	"context"

	"overdoll/libraries/account"
)

type EvaService interface {
	GetAccount(context.Context, string) (*account.Account, error)
	CreateAccount(context.Context, string, string) (*account.Account, error)
}

type ParleyService interface {
	GetNextModeratorId(context.Context) (string, error)
}
