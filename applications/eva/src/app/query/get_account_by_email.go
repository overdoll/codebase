package query

import (
	"context"
	"fmt"

	"overdoll/applications/eva/src/domain/account"
)

type GetAccountByEmailHandler struct {
	ur account.Repository
}

func NewGetAccountByEmailHandler(ur account.Repository) GetAccountByEmailHandler {
	return GetAccountByEmailHandler{ur: ur}
}

func (h GetAccountByEmailHandler) Handle(ctx context.Context, email string) (*account.Account, error) {

	ur, err := h.ur.GetAccountByEmail(ctx, email)

	if err != nil {
		return nil, fmt.Errorf("could not get account: %s", email)
	}

	return ur, nil
}
