package command

import (
	"context"
	"errors"
	"net/http"

	"github.com/gocql/gocql"
	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
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

func (h RedeemCookieHandler) Handle(ctx context.Context, id string) (*cookie.Cookie, error) {

	pass := passport.FromContext(ctx)

	// User is logged in
	if pass.IsAuthenticated() {
		return nil, nil
	}

	// RedeemCookie - this is when the user uses the redeemed cookie. This will
	// occur when the user uses the redeemed cookie in the same browser that has the 'otp-cookie' cookie

	// If this is a login (user with email exists), we remove the otp-cookie & pass account data.

	// If this is a registration (user with email doesn't exist), we keep the cookie, and remove it when we register, so the user
	// can complete the registration if they've accidentally closed their tab

	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	isSameSession := err == nil

	if err != nil && err != http.ErrNoCookie {
		return nil, ErrFailedCookieRedeem
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

	// cookie in cookie has to match the url cookie, otherwise any cookie can just be redeemed with an arbitrary value
	if isSameSession && currentCookie.Value != ck.Cookie() {
		return nil, nil
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

	// Remove OTP cookie
	http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	// Update passport to include our new user
	err = pass.MutatePassport(ctx, func(p *passport.Passport) error {
		p.SetUser(usr.ID())
		return nil
	})

	return ck, err
}
