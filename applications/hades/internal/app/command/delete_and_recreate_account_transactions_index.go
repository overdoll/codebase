package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type DeleteAndRecreateAccountTransactionsIndexHandler struct {
	bi billing.Repository
}

func NewDeleteAndRecreateAccountTransactionsIndexHandler(bi billing.Repository) DeleteAndRecreateAccountTransactionsIndexHandler {
	return DeleteAndRecreateAccountTransactionsIndexHandler{bi: bi}
}

func (h DeleteAndRecreateAccountTransactionsIndexHandler) Handle(ctx context.Context) error {
	return h.bi.DeleteAndRecreateAccountTransactionsIndex(ctx)
}
