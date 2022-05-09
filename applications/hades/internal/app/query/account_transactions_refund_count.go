package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type AccountTransactionsRefundCount struct {
	Principal *principal.Principal
	AccountId string
}

type AccountTransactionsRefundCountHandler struct {
	bi billing.Repository
}

func NewAccountTransactionsRefundCountHandler(bi billing.Repository) AccountTransactionsRefundCountHandler {
	return AccountTransactionsRefundCountHandler{bi: bi}
}

func (h AccountTransactionsRefundCountHandler) Handle(ctx context.Context, query AccountTransactionsRefundCount) (*int64, error) {
	return h.bi.GetAccountTransactionsCount(ctx, query.Principal, query.AccountId, []billing.Transaction{billing.Refund})
}
