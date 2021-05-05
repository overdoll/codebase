package command

import (
	"context"
	"net/http"

	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
	"overdoll/libraries/passport"
)

type AuthenticationHandler struct {
	cr cookie.Repository
	ur user.Repository
}

func NewAuthenticationHandler(cr cookie.Repository, ur user.Repository) AuthenticationHandler {
	return AuthenticationHandler{cr: cr, ur: ur}
}

func (h AuthenticationHandler) Handle(ctx context.Context) (*cookie.Cookie, *user.User, error) {
	pass := passport.FromContext(ctx)

	// User is logged in
	if pass.IsAuthenticated() {

		usr, err := h.ur.GetUserById(ctx, pass.UserID())

		if err != nil {
			return nil, nil, err
		}

		return nil, usr, nil
	}

	gc := helpers.GinContextFromContext(ctx)

	// User is not logged in, let's check for an OTP token
	otpCookie, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	// Error
	if err != nil {

		// Error says that this cookie doesn't exist
		if err == http.ErrNoCookie {
			return nil, nil, nil
		}

		return nil, nil, err
	}

	ck, err := h.cr.GetCookieById(ctx, otpCookie.Value)

	// Check to make sure we didn't get an error, and our cookie isn't expired
	if err != nil {
		// Cookie doesn't exist, remove it
		// TODO: only remove cookie if the response indicates that the cookie is expired or invalid- server errors will be ignored
		http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

		return nil, nil, nil
	}

	// Not yet redeemed, user needs to redeem it still
	if !ck.Redeemed() {
		return ck, nil, nil
	}

	// Redeemed - check if user exists with this email
	usr, err := h.ur.GetUserByEmail(ctx, ck.Email())

	// we weren't able to get our user, so that means that the cookie is not going to be deleted
	// user has to register
	if err != nil {
		return ck, nil, nil
	}

	// Remove OTP cookie - no longer needed at this step
	http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	// Update passport to include our new user
	err = pass.MutatePassport(ctx, func(p *passport.Passport) error {
		p.SetUser(usr.ID())
		return nil
	})

	if err != nil {
		return nil, nil, err
	}

	return ck, usr, nil
}
