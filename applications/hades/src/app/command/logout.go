package command

import (
	"context"
	"net/http"

	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/cookie"
	"overdoll/libraries/helpers"
)

type LogoutHandler struct{}

func NewLogoutHandler() LogoutHandler {
	return LogoutHandler{}
}

func (h LogoutHandler) Handle(ctx context.Context) (bool, error) {

	// Make sure we have the cookie in order to register
	currentCookie, err := cookie.ReadCookie(ctx, helpers.OTPKey)

	if err != nil {

		// Cookie doesn't exist
		if err == http.ErrNoCookie {
			return false, err
		}

		return false, err
	}

	gc := helpers.GinContextFromContext(ctx)

	// Get our cookie so we can get our email
	getAuthenticationCookie, err := r.Services.Eva().GetAuthenticationCookie(ctx, &eva.GetAuthenticationCookieRequest{Cookie: currentCookie.Value})

	if err != nil {
		return false, err
	}

	// Register our user
	getRegisteredUser, err := r.Services.Eva().RegisterUser(ctx, &eva.RegisterUserRequest{Username: data.Username, Email: getAuthenticationCookie.Email})

	if err != nil {
		return false, err
	}

	// Delete our cookie
	getDeletedCookie, err := r.Services.Eva().DeleteAuthenticationCookie(ctx, &eva.GetAuthenticationCookieRequest{Cookie: currentCookie.Value})

	if err != nil || getDeletedCookie == nil {
		return false, err
	}

	// Remove OTP token - registration is complete
	http.SetCookie(gc.Writer, &http.Cookie{Name: helpers.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	_, err = helpers.CreateUserSession(gc, r.Redis, getRegisteredUser.Id)

	if err != nil {
		return false, err
	}

	return true, nil
}
