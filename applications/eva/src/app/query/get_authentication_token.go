package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/token"
)

type GetAuthenticationTokenStatusHandler struct {
	tr token.Repository
	ar account.Repository
}

func NewGetAuthenticationTokenStatusHandler(tr token.Repository, ar account.Repository) GetAuthenticationTokenStatusHandler {
	return GetAuthenticationTokenStatusHandler{tr: tr, ar: ar}
}

var (
	ErrFailedGetToken = errors.New("failed to get authentication token")
)

func (h GetAuthenticationTokenStatusHandler) Handle(ctx context.Context, id string) (*account.Account, *token.AuthenticationToken, error) {

	tk, err := h.tr.GetAuthenticationTokenById(ctx, id)

	if err != nil {

		if err == token.ErrTokenNotFound {
			return nil, nil, nil
		}

		zap.S().Errorf("failed to get token: %s", err)
		return nil, nil, ErrFailedGetToken
	}

	// if cookie is redeemed, we also grab the account associated for this one
	if tk.Redeemed() {
		acc, err := h.ar.GetAccountByEmail(ctx, tk.Email())

		if err != nil {
			if err == account.ErrAccountNotFound {
				return nil, tk, nil
			}

			zap.S().Errorf("failed to get account: %s", err)
			return nil, nil, ErrFailedGetToken
		}

		return acc, tk, nil
	}

	return nil, tk, nil
}
