package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type AccountTransactionsChargebackCount struct {
	Principal *principal.Principal
	AccountId string
}

type AccountTransactionsChargebackCountHandler struct {
	bi billing.Repository
}

func NewAccountTransactionsChargebackCountHandler(bi billing.Repository) AccountTransactionsChargebackCountHandler {
	return AccountTransactionsChargebackCountHandler{bi: bi}
}

func (h AccountTransactionsChargebackCountHandler) Handle(ctx context.Context, query AccountTransactionsChargebackCount) (*int64, error) {
	return h.bi.GetAccountTransactionsCount(ctx, query.Principal, query.AccountId, []billing.Transaction{billing.Chargeback})
}
