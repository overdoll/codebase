package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type AccountTransactionById struct {
	Principal *principal.Principal
	Id        string
}

type AccountTransactionByIdHandler struct {
	br billing.Repository
}

func NewAccountTransactionByIdHandler(br billing.Repository) AccountTransactionByIdHandler {
	return AccountTransactionByIdHandler{br: br}
}

func (h AccountTransactionByIdHandler) Handle(ctx context.Context, cmd AccountTransactionById) (*billing.AccountTransaction, error) {

	accountTransactionHistory, err := h.br.GetAccountTransactionById(ctx, cmd.Principal, cmd.Id)

	if err != nil {
		return nil, err
	}

	return accountTransactionHistory, nil
}
