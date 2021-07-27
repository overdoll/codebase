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

func (h AuthenticationTokenByIdHandler) Handle(ctx context.Context, query AuthenticationTokenById) (*account.Account, *token.AuthenticationToken, error) {

	// Redeem cookie
	ck, err := h.tr.GetAuthenticationTokenById(ctx, query.TokenId)

	if err != nil {

		if err == token.ErrTokenNotFound {
			return nil, nil, nil
		}

		return nil, nil, err
	}

	// Verified - check if user exists with this email
	usr, err := h.ar.GetAccountByEmail(ctx, ck.Email())

	// we weren't able to get our user, so that means that the cookie is not going to be deleted
	// user has to register
	if err != nil {
		if err == account.ErrAccountNotFound {
			return nil, ck, nil
		}

		return nil, nil, err
	}

	// multi-factor auth is enabled, we get the auth types and figure out which ones the user has
	if usr.MultiFactorEnabled() {

		// get TOTP configuration to make sure it's configured
		_, err := h.mr.GetAccountMultiFactorTOTP(ctx, usr.ID())

		// no error
		if err == nil {
			// tell cookie that multi factor TOTP type is required, and we don't consume the cookie yet
			ck.RequireMultiFactor(true)
			return nil, ck, nil
		}

		if err != multi_factor.ErrTOTPNotConfigured {
			return nil, nil, err
		}

		return nil, ck, err
	}

	return usr, ck, err
}
