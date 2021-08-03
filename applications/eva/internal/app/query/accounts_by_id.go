package query

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
)

type AccountsById struct {
	AccountIds []string
}

type AccountsByIdHandler struct {
	ur account.Repository
}

func NewAccountsByIdHandler(ur account.Repository) AccountsByIdHandler {
	return AccountsByIdHandler{ur: ur}
}

func (h AccountsByIdHandler) Handle(ctx context.Context, query AccountsById) ([]*account.Account, error) {

	accounts, err := h.ur.GetAccountsById(ctx, query.AccountIds)

	if err != nil {
		return nil, err
	}

	return accounts, nil
}
