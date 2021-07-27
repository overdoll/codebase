package query

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
)

type AccountUsernameByUsername struct {
	AccountId string
	Username  string
}

type AccountUsernameByUsernameHandler struct {
	ar account.Repository
}

func NewAccountUsernameByUsernameHandler(ar account.Repository) AccountUsernameByUsernameHandler {
	return AccountUsernameByUsernameHandler{ar: ar}
}

func (h AccountUsernameByUsernameHandler) Handle(ctx context.Context, query AccountUsernameByUsername) (*account.Username, error) {

	realUser, err := h.ar.GetAccountUsername(ctx, query.AccountId, query.Username)

	if err != nil {
		return nil, err
	}

	return realUser, nil
}
