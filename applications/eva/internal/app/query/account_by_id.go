package query

import (
	"context"
	"overdoll/applications/eva/internal/domain/account"
)

type AccountByIdHandler struct {
	ur account.Repository
}

func NewAccountByIdHandler(ur account.Repository) AccountByIdHandler {
	return AccountByIdHandler{ur: ur}
}

func (h AccountByIdHandler) Handle(ctx context.Context, id string) (*account.Account, error) {

	ur, err := h.ur.GetAccountById(ctx, id)

	if err != nil {
		return nil, err
	}

	return ur, nil
}
