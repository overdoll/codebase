package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type IndexAllAccountTransactionsHandler struct {
	bi billing.IndexRepository
}

func NewIndexAllAccountTransactionsHandler(bi billing.IndexRepository) IndexAllAccountTransactionsHandler {
	return IndexAllAccountTransactionsHandler{bi: bi}
}

func (h IndexAllAccountTransactionsHandler) Handle(ctx context.Context) error {

	if err := h.bi.DeleteAccountTransactionsIndex(ctx); err != nil {
		return err
	}

	return h.bi.IndexAllAccountTransactions(ctx)
}
