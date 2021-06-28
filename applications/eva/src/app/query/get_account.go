package query

import (
	"context"
	"fmt"

	"overdoll/applications/eva/src/domain/account"
)

type GetAccountHandler struct {
	ur account.Repository
}

func NewGetAccountHandler(ur account.Repository) GetAccountHandler {
	return GetAccountHandler{ur: ur}
}

func (h GetAccountHandler) Handle(ctx context.Context, id string) (*account.Account, error) {

	ur, err := h.ur.GetAccountById(ctx, id)

	if err != nil {
		return nil, fmt.Errorf("could not get user: %s", id)
	}

	return ur, nil
}
