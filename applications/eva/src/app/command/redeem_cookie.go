package command

import (
	"context"
	"errors"

	"github.com/gocql/gocql"
	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/passport"
)

type RedeemCookieHandler struct {
	cr cookie.Repository
	ur user.Repository
}

func NewRedeemCookieHandler(cr cookie.Repository, ur user.Repository) RedeemCookieHandler {
	return RedeemCookieHandler{cr: cr, ur: ur}
}

var (
	ErrFailedCookieRedeem = errors.New("failed to redeem cookie")
)

func (h RedeemCookieHandler) Handle(ctx context.Context, isSameSession bool, id string) (*cookie.Cookie, error) {

	pass := passport.FromContext(ctx)

	// User is logged in
	if pass.IsAuthenticated() {
		return nil, nil
	}

	// Redeem cookie
	ck, err := h.cr.GetCookieById(ctx, id)

	if err != nil {

		if err == cookie.ErrCookieNotFound {
			return nil, nil
		}

		zap.S().Errorf("failed to get cookie: %s", err == gocql.ErrNotFound)
		return nil, ErrFailedCookieRedeem
	}

	// Redeem the cookie
	if err := ck.MakeRedeemed(); err != nil {
		return nil, err
	}

	// not the same session - just redeem and return out
	if !isSameSession {
		err = h.cr.UpdateCookie(ctx, ck)

		if err != nil {
			zap.S().Errorf("failed to update cookie: %s", err)
			return nil, ErrFailedCookieRedeem
		}

		return ck, nil
	}

	// Tell us that the cookie is in the same session (exists in http header)
	if err := ck.MakeSameSession(); err != nil {
		return nil, err
	}

	// Redeemed - check if user exists with this email
	usr, err := h.ur.GetUserByEmail(ctx, ck.Email())

	// we weren't able to get our user, so that means that the cookie is not going to be deleted
	// user has to register
	if err != nil {

		if err == user.ErrUserNotFound {

			// We also update the cookie so that it can count as "redeemed
			err = h.cr.UpdateCookie(ctx, ck)

			if err != nil {
				zap.S().Errorf("failed to update cookie: %s", err)
				return nil, ErrFailedCookieRedeem
			}

			return ck, nil
		}

		zap.S().Errorf("failed to find user: %s", err)
		return nil, ErrFailedCookieRedeem
	}

	if err := ck.MakeConsumed(); err != nil {
		return nil, err
	}

	// Delete cookie - user is registered, so we don't need to wait for another call where the user will
	// enter a username, since they already have an account and we can log them in
	err = h.cr.DeleteCookieById(ctx, id)

	if err != nil {
		zap.S().Errorf("failed to delete cookie: %s", err)
		return nil, ErrFailedCookieRedeem
	}

	// Update passport to include our new user
	err = pass.MutatePassport(ctx, func(p *passport.Passport) error {
		p.SetUser(usr.ID())
		return nil
	})

	return ck, err
}
