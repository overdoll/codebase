package query

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
)

type AccountEmailByEmail struct {
	AccountId string
	Email     string
}

type AccountEmailByEmailHandler struct {
	ar account.Repository
}

func NewAccountEmailByEmailHandler(ar account.Repository) AccountEmailByEmailHandler {
	return AccountEmailByEmailHandler{ar: ar}
}

func (h AccountEmailByEmailHandler) Handle(ctx context.Context, query AccountEmailByEmail) (*account.Email, error) {

	mail, err := h.ar.GetAccountEmail(ctx, query.AccountId, query.Email)

	if err != nil {
		return nil, err
	}

	return mail, nil
}
