package command

import (
	"context"
	"errors"

	"github.com/gocql/gocql"
	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/multi_factor"
)

type AuthenticationHandler struct {
	cr cookie.Repository
	ur account.Repository
	mr multi_factor.Repository
}

func NewAuthenticationHandler(cr cookie.Repository, ur account.Repository, mr multi_factor.Repository) AuthenticationHandler {
	return AuthenticationHandler{cr: cr, ur: ur, mr: mr}
}

var (
	ErrFailedCheckAuthentication = errors.New("failed to check auth")
)

func (h AuthenticationHandler) Handle(ctx context.Context, userId string, hasCookie bool, cookieValue string) (*cookie.Cookie, *account.Account, error) {

	// Account is logged in
	if userId != "" {

		usr, err := h.ur.GetAccountById(ctx, userId)

		if err != nil {
			zap.S().Errorf("failed to get user: %s", err)
			return nil, nil, ErrFailedCheckAuthentication
		}

		return nil, usr, nil
	}

	if !hasCookie {
		return nil, nil, nil
	}

	ck, err := h.cr.GetCookieById(ctx, cookieValue)

	// Check to make sure we didn't get an error, and our cookie isn't expired
	if err != nil {

		if err == gocql.ErrNotFound {
			return nil, nil, nil
		}

		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, nil, ErrFailedCheckAuthentication
	}

	// Not yet redeemed, user needs to redeem it still
	if !ck.Redeemed() {
		return ck, nil, nil
	}

	// Redeemed - check if user exists with this email
	usr, err := h.ur.GetAccountByEmail(ctx, ck.Email())

	// we weren't able to get our user, so that means that the cookie is not going to be deleted
	// user has to register
	if err != nil {

		if err == account.ErrAccountNotFound {
			return ck, nil, nil
		}

		zap.S().Errorf("failed to get user: %s", err)
		return nil, nil, ErrFailedCheckAuthentication
	}

	// multi-factor auth is enabled, we get the auth types and figure out which ones the user has
	if usr.MultiFactorEnabled() {

		// get TOTP configuration to make sure it's configured
		_, err := h.mr.GetAccountMultiFactorTOTP(ctx, usr.ID())

		// no error
		if err == nil {
			// tell cookie that multi factor TOTP type is required, and we don't consume the cookie yet
			ck.RequireMultiFactor(true)
			return ck, usr, err
		}

		if err != multi_factor.ErrTOTPNotConfigured {
			zap.S().Errorf("failed to get totp: %s", err)
			return nil, nil, ErrFailedCookieRedeem
		}
	}

	return ck, usr, nil
}
