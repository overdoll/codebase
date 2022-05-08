package metrics

import (
	"context"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

type Repository interface {
	CreateClubTransactionMetric(ctx context.Context, metric *ClubTransactionMetric) error
	SearchClubTransactionMetrics(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, clubId string) ([]*ClubTransactionMetrics, error)
	GetClubTransactionMetrics(ctx context.Context, clubId string, timestamp time.Time) (*ClubTransactionMetrics, error)

	IsClubAlreadySuspended(ctx context.Context, clubId string, timestamp time.Time) (bool, error)
	AddClubAlreadySuspended(ctx context.Context, clubId string, timestamp time.Time) error
}
