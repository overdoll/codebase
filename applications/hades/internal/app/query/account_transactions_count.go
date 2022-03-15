package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type AccountTransactionsCount struct {
	Principal *principal.Principal
	AccountId string
	Type      *string
}

type AccountTransactionsCountHandler struct {
	bi billing.IndexRepository
}

func NewAccountTransactionsCountHandler(bi billing.IndexRepository) AccountTransactionsCountHandler {
	return AccountTransactionsCountHandler{bi: bi}
}

func (h AccountTransactionsCountHandler) Handle(ctx context.Context, query AccountTransactionsCount) (*int64, error) {

	var transaction *billing.Transaction

	if query.Type != nil {

		t, err := billing.TransactionFromString(*query.Type)

		if err != nil {
			return nil, err
		}

		transaction = &t
	}

	return h.bi.GetAccountTransactionsCount(ctx, query.Principal, query.AccountId, transaction)
}
