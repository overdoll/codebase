package command

import (
	"context"
	"errors"
	"fmt"
	"net/http"

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

func (h RedeemCookieHandler) Handle(ctx context.Context, id string) (*cookie.Cookie, error) {

	pass := passport.FromContext(ctx)

	// User is logged in
	if pass.IsAuthenticated() {
		return nil, errors.New("user is logged in")
	}

	// RedeemCookie - this is when the user uses the redeemed cookie. This will
	// occur when the user uses the redeemed cookie in the same browser that has the 'otp-cookie' cookie

	// If this is a login (user with email exists), we remove the otp-cookie & pass account data.

	// If this is a registration (user with email doesn't exist), we keep the cookie, and remove it when we register, so the user
	// can complete the registration if they've accidentally closed their tab

	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	if err != nil && err != http.ErrNoCookie {
		return nil, err
	}

	isSameSession := err != nil

	// Redeem cookie
	ck, err := h.cr.GetCookieById(ctx, id)

	if err != nil {
		return nil, fmt.Errorf("could not get cookie: %s", err)
	}

	// cookie in cookie has to match the url cookie, otherwise any cookie can just be redeemed with an arbitrary value
	if isSameSession && currentCookie.Value != ck.Cookie() {
		return nil, errors.New("invalid cookie")
	}

	// Redeem the cookie
	if err := ck.MakeRedeemed(); err != nil {
		return nil, err
	}

	// not the same session - just redeem and return out
	if !isSameSession {
		err = h.cr.UpdateCookie(ctx, ck)

		if err != nil {
			return nil, fmt.Errorf("failed to update cookie: %s", err)
		}

		return nil, nil
	}

	// Redeemed - check if user exists with this email
	_, err = h.ur.GetUserByEmail(ctx, ck.Email())

	// we weren't able to get our user, so that means that the cookie is not going to be deleted
	// user has to register
	if err != nil {
		return ck, nil
	}

	if err := ck.MakeConsumed(); err != nil {
		return nil, err
	}

	// Delete cookie - user is registered, so we don't need to wait for another call where the user will
	// enter a username, since they already have an account and we can log them in
	err = h.cr.DeleteCookieById(ctx, id)

	if err != nil {
		return nil, fmt.Errorf("failed to delete cookie: %s", err)
	}

	// Remove OTP cookie
	http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})
	// TODO: set session cookie here

	return nil, nil
}
