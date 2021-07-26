package query

import (
	"context"

	"overdoll/libraries/account"
)

type EvaService interface {
	GetAccount(context.Context, string) (*account.Account, error)
}
