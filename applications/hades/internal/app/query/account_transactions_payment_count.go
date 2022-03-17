package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type AccountTransactionsPaymentCount struct {
	Principal *principal.Principal
	AccountId string
}

type AccountTransactionsPaymentCountHandler struct {
	bi billing.IndexRepository
}

func NewAccountTransactionsPaymentCountHandler(bi billing.IndexRepository) AccountTransactionsPaymentCountHandler {
	return AccountTransactionsPaymentCountHandler{bi: bi}
}

func (h AccountTransactionsPaymentCountHandler) Handle(ctx context.Context, query AccountTransactionsPaymentCount) (*int64, error) {
	return h.bi.GetAccountTransactionsCount(ctx, query.Principal, query.AccountId, []billing.Transaction{billing.Payment})
}
