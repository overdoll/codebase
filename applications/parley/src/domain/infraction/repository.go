package infraction

import (
	"context"
)

type Repository interface {
	GetRejectionReasons(context.Context) ([]*PendingPostRejectionReason, error)
	GetRejectionReason(context.Context, string) (*PendingPostRejectionReason, error)
}
