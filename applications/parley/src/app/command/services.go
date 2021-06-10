package command

import (
	"context"

	"overdoll/libraries/user"
)

type EvaService interface {
	GetUser(context.Context, string) (*user.User, error)
	LockUser(context.Context, string, int64) (*user.User, error)
}

type StingService interface {
	GetPendingPost(context.Context, string) (string, string, error)
	PublishPendingPost(context.Context, string) error
	RejectPendingPost(context.Context, string) error
	DiscardPendingPost(context.Context, string) error
	UndoPendingPost(context.Context, string) error
}
