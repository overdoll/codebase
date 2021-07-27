package query

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
)

type AccountByUsernameHandler struct {
	ur account.Repository
}

func NewAccountByUsernameHandler(ur account.Repository) AccountByUsernameHandler {
	return AccountByUsernameHandler{ur: ur}
}

func (h AccountByUsernameHandler) Handle(ctx context.Context, username string) (*account.Account, error) {

	ur, err := h.ur.GetAccountByUsername(ctx, username)

	if err != nil {
		return nil, err
	}

	return ur, nil
}
