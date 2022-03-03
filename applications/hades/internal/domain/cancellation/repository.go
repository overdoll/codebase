package cancellation

import (
	"context"
	"overdoll/libraries/paging"
)

type Repository interface {
	GetReasonById(ctx context.Context, id string) (*Reason, error)
	GetReasons(ctx context.Context, cursor *paging.Cursor, deprecated bool) ([]*Reason, error)

	CreateReason(ctx context.Context, reason *Reason) error
	UpdateReasonTitle(ctx context.Context, reasonId string, updateFn func(reason *Reason) error) (*Reason, error)
	UpdateReasonDeprecated(ctx context.Context, reasonId string, updateFn func(reason *Reason) error) (*Reason, error)
}
