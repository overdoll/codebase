package command

import (
	"context"

	"overdoll/libraries/account"
)

type EvaService interface {
	GetAccount(context.Context, string) (*account.Account, error)
	LockAccount(context.Context, string, int64) error
}
type StingService interface {
	GetPost(context.Context, string) (string, string, error)
	PublishPost(context.Context, string) error
	RejectPost(context.Context, string) error
	DiscardPost(context.Context, string) error
	UndoPost(context.Context, string) error
}
