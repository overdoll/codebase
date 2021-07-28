package command

import (
	"context"

	"overdoll/libraries/principal"
)

type EvaService interface {
	GetAccount(context.Context, string) (*principal.Principal, error)
	LockAccount(context.Context, string, int64) error
}
type StingService interface {
	GetPost(context.Context, string) (string, string, error)
	PublishPost(context.Context, string) error
	RejectPost(context.Context, string) error
	DiscardPost(context.Context, string) error
	UndoPost(context.Context, string) error
}
