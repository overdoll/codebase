package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type AccountTransactionHistoryById struct {
	Principal *principal.Principal
	Id        string
}

type AccountTransactionHistoryByIdHandler struct {
	br billing.Repository
}

func NewAccountTransactionHistoryByIdHandler(br billing.Repository) AccountTransactionHistoryByIdHandler {
	return AccountTransactionHistoryByIdHandler{br: br}
}

func (h AccountTransactionHistoryByIdHandler) Handle(ctx context.Context, cmd AccountTransactionHistoryById) (*billing.AccountTransactionHistory, error) {

	accountTransactionHistory, err := h.br.GetAccountTransactionHistoryById(ctx, cmd.Principal, cmd.Id)

	if err != nil {
		return nil, err
	}

	return accountTransactionHistory, nil
}
