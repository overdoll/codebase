package query

import (
	"context"
	"fmt"

	"overdoll/applications/eva/src/domain/account"
)

type GetAccountByUsernameHandler struct {
	ur account.Repository
}

func NewGetAccountByUsernameHandler(ur account.Repository) GetAccountByUsernameHandler {
	return GetAccountByUsernameHandler{ur: ur}
}

func (h GetAccountByUsernameHandler) Handle(ctx context.Context, username string) (*account.Account, error) {

	ur, err := h.ur.GetAccountByUsername(ctx, username)

	if err != nil {
		return nil, fmt.Errorf("could not get account: %s", username)
	}

	return ur, nil
}
