package query

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/applications/eva/internal/domain/token"
)

type AuthenticationTokenById struct {
	TokenId string
}

type AuthenticationTokenByIdHandler struct {
	tr token.Repository
	ar account.Repository
	mr multi_factor.Repository
}

func NewAuthenticationTokenByIdHandler(tr token.Repository, ar account.Repository, mr multi_factor.Repository) AuthenticationTokenByIdHandler {
	return AuthenticationTokenByIdHandler{tr: tr, ar: ar, mr: mr}
}

func (h AuthenticationTokenByIdHandler) Handle(ctx context.Context, query AuthenticationTokenById) (*token.AuthenticationToken, error) {

	// Redeem cookie
	ck, err := h.tr.GetAuthenticationTokenById(ctx, query.TokenId)

	if err != nil {

		if err == token.ErrTokenNotFound {
			return nil, err
		}

		return nil, err
	}

	// not verified, don't give additional details
	if !ck.Verified() {
		return ck, nil
	}

	// Verified - check if user exists with this email
	acc, err := h.ar.GetAccountByEmail(ctx, ck.Email())

	// we weren't able to get our user, so that means that the cookie is not going to be deleted
	// user has to register
	if err != nil {

		if err == account.ErrAccountNotFound {
			return ck, nil
		}

		return nil, err
	}

	ck.SetAccountDetails(acc)

	return ck, err
}
