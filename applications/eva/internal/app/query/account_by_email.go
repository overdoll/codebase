package query

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
)

type AccountByEmailHandler struct {
	ur account.Repository
}

func NewAccountByEmailHandler(ur account.Repository) AccountByEmailHandler {
	return AccountByEmailHandler{ur: ur}
}

func (h AccountByEmailHandler) Handle(ctx context.Context, email string) (*account.Account, error) {

	acc, err := h.ur.GetAccountByEmail(ctx, email)

	if err != nil {
		return nil, err
	}

	return acc, nil
}
