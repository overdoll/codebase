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

type ConsumeCookieHandler struct {
	cr cookie.Repository
	ur account.Repository
	mr multi_factor.Repository
}

func NewConsumeCookieHandler(cr cookie.Repository, ur account.Repository) ConsumeCookieHandler {
	return ConsumeCookieHandler{cr: cr, ur: ur}
}

var (
	ErrFailedCookieConsume = errors.New("failed to consume cookie")
)

func (h ConsumeCookieHandler) Handle(ctx context.Context, cookieId string) (*account.Account, *cookie.Cookie, error) {

	// Redeem cookie
	ck, err := h.cr.GetCookieById(ctx, cookieId)

	if err != nil {

		if err == cookie.ErrCookieNotFound {
			return nil, nil, nil
		}

		zap.S().Errorf("failed to get cookie: %s", err == gocql.ErrNotFound)
		return nil, nil, ErrFailedCookieConsume
	}

	// Redeemed - check if user exists with this email
	usr, err := h.ur.GetAccountByEmail(ctx, ck.Email())

	// we weren't able to get our user, so that means that the cookie is not going to be deleted
	// user has to register
	if err != nil {
		if err == account.ErrAccountNotFound {
			return nil, ck, nil
		}

		zap.S().Errorf("failed to find user: %s", err)
		return nil, nil, ErrFailedCookieConsume
	}

	if err := ck.MakeConsumed(); err != nil {
		return nil, ck, err
	}

	// multi-factor auth is enabled, we get the auth types and figure out which ones the user has
	if usr.MultiFactorEnabled() {

		// get TOTP configuration to make sure it's configured
		_, err := h.mr.GetAccountMultiFactorTOTP(ctx, usr.ID())

		// no error
		if err == nil {
			// tell cookie that multi factor TOTP type is required, and we don't consume the cookie yet
			ck.RequireMultiFactor(true)
			return nil, ck, err
		}

		if err != multi_factor.ErrTOTPNotConfigured {
			zap.S().Errorf("failed to get totp: %s", err)
			return nil, nil, ErrFailedCookieConsume
		}
	}

	// Delete cookie - user is registered, so we don't need to wait for another call where the user will
	// enter a username, since they already have an account and we can log them in
	if err := h.cr.DeleteCookieById(ctx, cookieId); err != nil {
		zap.S().Errorf("failed to delete cookie: %s", err)
		return nil, nil, ErrFailedCookieConsume
	}

	return usr, ck, err
}
