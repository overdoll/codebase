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

type RedeemCookieHandler struct {
	cr cookie.Repository
	ur account.Repository
	mr multi_factor.Repository
}

func NewRedeemCookieHandler(cr cookie.Repository, ur account.Repository) RedeemCookieHandler {
	return RedeemCookieHandler{cr: cr, ur: ur}
}

var (
	ErrFailedCookieRedeem = errors.New("failed to redeem cookie")
)

func (h RedeemCookieHandler) Handle(ctx context.Context, isSameSession bool, id string) (*account.Account, *cookie.Cookie, error) {

	// Redeem cookie
	ck, err := h.cr.GetCookieById(ctx, id)

	if err != nil {

		if err == cookie.ErrCookieNotFound {
			return nil, nil, nil
		}

		zap.S().Errorf("failed to get cookie: %s", err == gocql.ErrNotFound)
		return nil, nil, ErrFailedCookieRedeem
	}

	// Redeem the cookie
	if err := ck.MakeRedeemed(); err != nil {
		return nil, nil, err
	}

	// not the same session - just redeem and return out
	if !isSameSession {
		err = h.cr.UpdateCookie(ctx, ck)

		if err != nil {
			zap.S().Errorf("failed to update cookie: %s", err)
			return nil, nil, ErrFailedCookieRedeem
		}

		return nil, ck, nil
	}

	// Tell us that the cookie is in the same session (exists in http header)
	if err := ck.MakeSameSession(); err != nil {
		return nil, nil, err
	}

	// Redeemed - check if user exists with this email
	usr, err := h.ur.GetAccountByEmail(ctx, ck.Email())

	// we weren't able to get our user, so that means that the cookie is not going to be deleted
	// user has to register
	if err != nil {

		if err == account.ErrAccountNotFound {

			// We also update the cookie so that it can count as "redeemed
			err = h.cr.UpdateCookie(ctx, ck)

			if err != nil {
				zap.S().Errorf("failed to update cookie: %s", err)
				return nil, nil, ErrFailedCookieRedeem
			}

			return nil, ck, nil
		}

		zap.S().Errorf("failed to find user: %s", err)
		return nil, nil, ErrFailedCookieRedeem
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
			return nil, nil, ErrFailedCookieRedeem
		}
	}

	if err := ck.MakeConsumed(); err != nil {
		return nil, nil, err
	}

	// Delete cookie - user is registered, so we don't need to wait for another call where the user will
	// enter a username, since they already have an account and we can log them in
	err = h.cr.DeleteCookieById(ctx, id)

	if err != nil {
		zap.S().Errorf("failed to delete cookie: %s", err)
		return nil, nil, ErrFailedCookieRedeem
	}

	return usr, ck, err
}
