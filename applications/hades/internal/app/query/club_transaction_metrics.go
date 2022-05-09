package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/metrics"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type ClubTransactionMetrics struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	ClubId    string
}

type ClubTransactionMetricsHandler struct {
	mr metrics.Repository
}

func NewClubTransactionMetricsHandler(mr metrics.Repository) ClubTransactionMetricsHandler {
	return ClubTransactionMetricsHandler{mr: mr}
}

func (h ClubTransactionMetricsHandler) Handle(ctx context.Context, query ClubTransactionMetrics) ([]*metrics.ClubTransactionMetrics, error) {
	return h.mr.SearchClubTransactionMetrics(ctx, query.Principal, query.Cursor, query.ClubId)
}
