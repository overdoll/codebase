package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type AccountTransactionsTotalCount struct {
	Principal *principal.Principal
	AccountId string
}

type AccountTransactionsTotalCountHandler struct {
	bi billing.Repository
}

func NewAccountTransactionsCountHandler(bi billing.Repository) AccountTransactionsTotalCountHandler {
	return AccountTransactionsTotalCountHandler{bi: bi}
}

func (h AccountTransactionsTotalCountHandler) Handle(ctx context.Context, query AccountTransactionsTotalCount) (*int64, error) {
	return h.bi.GetAccountTransactionsCount(ctx, query.Principal, query.AccountId, []billing.Transaction{billing.Chargeback, billing.Payment, billing.Refund})
}
