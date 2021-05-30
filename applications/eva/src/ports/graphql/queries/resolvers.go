package queries

import (
	"context"
	"net/http"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/app/command"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
)

type QueryResolver struct {
	App *app.Application
}

func (r *QueryResolver) RedeemCookie(ctx context.Context, cookieId string) (*types.Cookie, error) {
	// RedeemCookie - this is when the user uses the redeemed cookie. This will
	// occur when the user uses the redeemed cookie in the same browser that has the 'otp-cookie' cookie

	// If this is a login (user with email exists), we remove the otp-cookie & pass account data.

	// If this is a registration (user with email doesn't exist), we keep the cookie, and remove it when we register, so the user
	// can complete the registration if they've accidentally closed their tab

	gc := helpers.GinContextFromContext(ctx)

	_, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	isSameSession := err == nil

	if err != nil && err != http.ErrNoCookie {
		return nil, command.ErrFailedCookieRedeem
	}

	ck, err := r.App.Commands.RedeemCookie.Handle(ctx, isSameSession, cookieId)

	if err != nil {
		return nil, err
	}

	// If ck is returned as nil, cookie is invalid
	if ck == nil {
		return &types.Cookie{
			SameSession: false,
			Registered:  false,
			Redeemed:    false,
			Session:     "",
			Email:       "",
			Invalid:     true,
		}, nil
	}

	// Cookie was consumed and a passport was added to context
	if ck.Consumed() {
		// Remove OTP cookie
		http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})
	}

	return &types.Cookie{
		SameSession: ck.SameSession(),
		Registered:  ck.Consumed(),
		Redeemed:    true,
		Session:     ck.Session(),
		Email:       ck.Email(),
		Invalid:     false,
	}, nil
}

func (r *QueryResolver) Authentication(ctx context.Context) (*types.Authentication, error) {

	gc := helpers.GinContextFromContext(ctx)

	// User is not logged in, let's check for an OTP token
	otpCookie, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	// Error
	if err != nil && err != http.ErrNoCookie {
		zap.S().Errorf("failed to get cookie header: %s", err)
		return nil, command.ErrFailedCheckAuthentication
	}

	cookieValue := ""

	if otpCookie != nil {
		cookieValue = otpCookie.Value
	}

	hasCookie := err == nil

	ck, usr, err := r.App.Commands.Authentication.Handle(ctx, hasCookie, cookieValue)

	if err != nil {
		return nil, err
	}

	if usr != nil {
		if hasCookie {
			http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})
		}

		return &types.Authentication{
			Cookie: nil,
			User:   &types.User{Username: usr.Username()},
		}, nil
	}

	if ck != nil {
		return &types.Authentication{
			Cookie: &types.Cookie{
				SameSession: true,
				Registered:  false,
				Redeemed:    ck.Redeemed(),
				Session:     ck.Session(),
				Email:       ck.Email(),
				Invalid:     false,
			},
			User: nil,
		}, nil
	}

	return &types.Authentication{
		Cookie: nil,
		User:   nil,
	}, nil
}
