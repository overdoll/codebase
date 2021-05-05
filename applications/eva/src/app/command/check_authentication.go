package command

import (
	"context"
	"net/http"

	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/applications/eva/src/ports/graphql/types"
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

func (h AuthenticationHandler) Handle(ctx context.Context) (*types.Authentication, error) {
	pass := passport.FromContext(ctx)

	// User is logged in
	if pass.IsAuthenticated() {

		usr, err := h.ur.GetUserById(ctx, pass.UserID())

		if err != nil {
			return nil, err
		}

		return &types.Authentication{User: &types.User{Username: usr.Username()}, Cookie: nil}, nil
	}

	gc := helpers.GinContextFromContext(ctx)

	// User is not logged in, let's check for an OTP token
	otpCookie, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	// Error
	if err != nil {

		// Error says that this cookie doesn't exist
		if err == http.ErrNoCookie {
			return &types.Authentication{User: nil, Cookie: nil}, nil
		}

		return nil, err
	}

	ck, err := h.cr.GetCookieById(ctx, otpCookie.Value)

	// Check to make sure we didn't get an error, and our cookie isn't expired
	if err != nil {
		// Cookie doesn't exist, remove it
		// TODO: only remove cookie if the response indicates that the cookie is expired or invalid- server errors will be ignored
		http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

		return &types.Authentication{User: nil, Cookie: nil}, nil
	}

	// Not yet redeemed, user needs to redeem it still
	if !ck.Redeemed() {
		return &types.Authentication{User: nil, Cookie: &types.Cookie{
			SameSession: true,
			Registered:  false,
			Redeemed:    false,
			Session:     ck.Session(),
			Email:       ck.Email(),
			Invalid:     false,
		}}, nil
	}

	// Redeemed - check if user exists with this email
	_, err = h.ur.GetUserByEmail(ctx, ck.Email())

	// we weren't able to get our user, so that means that the cookie is not going to be deleted
	// user has to register
	if err != nil {
		return &types.Authentication{User: nil, Cookie: &types.Cookie{
			SameSession: true,
			Registered:  false,
			Redeemed:    true,
			Session:     ck.Session(),
			Email:       ck.Email(),
			Invalid:     false,
		}}, nil
	}

	// Remove OTP cookie - no longer needed at this step
	http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	// TODO: create a new passport here with the authenticated user

	return nil, nil
}
