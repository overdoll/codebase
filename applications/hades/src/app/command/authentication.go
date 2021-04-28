package command

import (
	"context"
	"net/http"

	eva "overdoll/applications/eva/proto"
	"overdoll/applications/hades/src/domain/user"
	"overdoll/applications/hades/src/ports/graphql/types"
)

type AuthenticationHandler struct{}

func NewAuthenticationHandler() AuthenticationHandler {
	return AuthenticationHandler{}
}

func (h AuthenticationHandler) Handle(ctx context.Context) (*types.Authentication, error) {
	usr := user.FromContext(ctx)
	gc := helpers.GinContextFromContext(ctx)

	// User is logged in
	if user != nil {
		return &models.Authentication{User: &models.User{Username: user.Username}, Cookie: nil}, nil
	}

	// User is not logged in, let's check for an OTP token
	otpCookie, err := helpers.ReadCookie(ctx, helpers.OTPKey)

	// Error
	if err != nil {

		// Error says that this cookie doesn't exist
		if err == http.ErrNoCookie {
			return &models.Authentication{User: nil, Cookie: nil}, nil
		}

		return nil, err
	}

	// Get authentication cookie data, so we can check if it's been redeemed yet
	getAuthenticationCookie, err := r.Services.Eva().GetAuthenticationCookie(ctx, &eva.GetAuthenticationCookieRequest{Cookie: otpCookie.Value})

	// Check to make sure we didn't get an error, and our cookie isn't expired
	if err != nil {
		// Cookie doesn't exist, remove it
		http.SetCookie(gc.Writer, &http.Cookie{Name: helpers.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})
		return &models.Authentication{User: nil, Cookie: nil}, nil
	}

	cookie := &models.Cookie{
		Redeemed:    getAuthenticationCookie.Redeemed,
		Registered:  false,
		SameSession: true,
		Session:     getAuthenticationCookie.Session,
		Email:       getAuthenticationCookie.Email,
	}

	// Not yet redeemed, user needs to redeem it still
	if getAuthenticationCookie.Redeemed == false {
		return &models.Authentication{User: nil, Cookie: cookie}, nil
	}

	// Cookie redeemed, check if user is registered
	getRegisteredUser, err := r.Services.Eva().GetRegisteredEmail(ctx, &eva.GetRegisteredEmailRequest{Email: getAuthenticationCookie.Email})

	if err != nil {
		return nil, err
	}

	cookie.Registered = getRegisteredUser.Username != ""

	// User not registered, we tell them to register
	if getRegisteredUser.Username == "" {
		return &models.Authentication{User: nil, Cookie: cookie}, nil
	}

	// make sure we delete this redeemed authentication cookie
	_, err = r.Services.Eva().DeleteAuthenticationCookie(ctx, &eva.GetAuthenticationCookieRequest{Cookie: otpCookie.Value})

	if err != nil {
		return nil, err
	}

	// Remove OTP cookie - user is registered
	http.SetCookie(gc.Writer, &http.Cookie{Name: helpers.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	// User registered, Create user session
	_, err = helpers.CreateUserSession(gc, r.Redis, getRegisteredUser.Id)

	if err != nil {
		return nil, err
	}

	// Return user, since we logged in
	return &models.Authentication{User: &models.User{Username: getRegisteredUser.Username}, Cookie: cookie}, nil
}
