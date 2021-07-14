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
	GetPendingPost(context.Context, string) (string, string, error)
	PublishPendingPost(context.Context, string) error
	RejectPendingPost(context.Context, string) error
	DiscardPendingPost(context.Context, string) error
	UndoPendingPost(context.Context, string) error
}
