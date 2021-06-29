package command

import (
	"context"
	"errors"

	"github.com/gocql/gocql"
	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/cookie"
)

type AuthenticationHandler struct {
	cr cookie.Repository
	ur account.Repository
}

func NewAuthenticationHandler(cr cookie.Repository, ur account.Repository) AuthenticationHandler {
	return AuthenticationHandler{cr: cr, ur: ur}
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

	return ck, usr, nil
}
