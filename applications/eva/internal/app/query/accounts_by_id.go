package query

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
)

type AccountsByIds struct {
	AccountIds []string
}

type AccountsByIdsHandler struct {
	ur account.Repository
}

func NewAccountsByIdsHandler(ur account.Repository) AccountsByIdsHandler {
	return AccountsByIdsHandler{ur: ur}
}

func (h AccountsByIdsHandler) Handle(ctx context.Context, query AccountsByIds) ([]*account.Account, error) {

	accounts, err := h.ur.GetAccountsById(ctx, query.AccountIds)

	if err != nil {
		return nil, err
	}

	return accounts, nil
}
