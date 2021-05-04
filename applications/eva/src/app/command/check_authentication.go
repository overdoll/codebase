package command

import (
	"context"
	"net/http"

	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/common"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
)

type AuthenticationHandler struct {
	cr cookie.Repository
	ur user.Repository
}

func NewAuthenticationHandler(eva app.EvaService) AuthenticationHandler {
	return AuthenticationHandler{eva: eva}
}

func (h AuthenticationHandler) Handle(ctx context.Context) (*types.Authentication, error) {
	usr := common.FromContext(ctx)

	gc := helpers.GinContextFromContext(ctx)

	// User is logged in
	if usr != nil {
		return &types.Authentication{User: &types.User{Username: usr.Username()}, Cookie: nil}, nil
	}

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

	// Get authentication cookie data, so we can check if it's been redeemed yet
	cookieData, err := h.eva.AttemptConsumeCookie(ctx, otpCookie.Value)

	// Check to make sure we didn't get an error, and our cookie isn't expired
	if err != nil {
		// Cookie doesn't exist, remove it

		// TODO: only remove cookie if the response indicates that the cookie is expired or invalid- server errors will be ignored
		http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

		return &types.Authentication{User: nil, Cookie: nil}, nil
	}

	ck := &types.Cookie{
		Redeemed:    cookieData.Cookie.Redeemed,
		Registered:  cookieData.Session != nil,
		SameSession: true,
		Session:     cookieData.Cookie.Session,
		Email:       cookieData.Cookie.Email,
	}

	// Not yet redeemed or registered, user needs to redeem it still
	if !ck.Redeemed || !ck.Registered {
		return &types.Authentication{User: nil, Cookie: ck}, nil
	}

	// Remove OTP cookie - no longer needed at this step
	http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	// TODO: set session cookie here from ck.Session.Token

	// Return user, since we logged in
	return &types.Authentication{User: &types.User{Username: cookieData.Session.User.Username}, Cookie: ck}, nil
}
