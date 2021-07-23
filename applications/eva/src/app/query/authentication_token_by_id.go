package query

import (
	"context"
	"errors"

	"github.com/gocql/gocql"
	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/multi_factor"
	"overdoll/applications/eva/src/domain/token"
)

var (
	errFailedGetToken = errors.New("failed to get authentication token")
)

type AuthenticationTokenByIdHandler struct {
	tr token.Repository
	ar account.Repository
	mr multi_factor.Repository
}

func NewAuthenticationTokenByIdHandler(tr token.Repository, ar account.Repository, mr multi_factor.Repository) AuthenticationTokenByIdHandler {
	return AuthenticationTokenByIdHandler{tr: tr, ar: ar, mr: mr}
}

func (h AuthenticationTokenByIdHandler) Handle(ctx context.Context, tokenId string) (*account.Account, *token.AuthenticationToken, error) {

	// Redeem cookie
	ck, err := h.tr.GetAuthenticationTokenById(ctx, tokenId)

	if err != nil {

		if err == token.ErrTokenNotFound {
			return nil, nil, nil
		}

		zap.S().Errorf("failed to get cookie: %s", err == gocql.ErrNotFound)
		return nil, nil, errFailedGetToken
	}

	// Verified - check if user exists with this email
	usr, err := h.ar.GetAccountByEmail(ctx, ck.Email())

	// we weren't able to get our user, so that means that the cookie is not going to be deleted
	// user has to register
	if err != nil {
		if err == account.ErrAccountNotFound {
			return nil, ck, nil
		}

		zap.S().Errorf("failed to find user: %s", err)
		return nil, nil, errFailedGetToken
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
			zap.S().Errorf("failed to get totp: %s", err)
			return nil, nil, errFailedGetToken
		}

		return nil, ck, err
	}

	return usr, ck, err
}
