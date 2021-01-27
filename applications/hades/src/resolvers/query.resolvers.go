package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"net/http"

	eva "project01101000/codebase/applications/eva/proto"
	gen "project01101000/codebase/applications/hades/src"
	"project01101000/codebase/applications/hades/src/helpers"
	"project01101000/codebase/applications/hades/src/models"

	"github.com/streadway/amqp"
)

func (r *queryResolver) RedeemCookie(ctx context.Context, cookie string) (*models.Cookie, error) {
	// RedeemCookie - this is when the user uses the redeemed cookie. This will
	// occur when the user uses the redeemed cookie in the same browser that has the 'otp-cookie' cookie

	// If this is a login (user with email exists), we remove the otp-cookie & pass account data.

	// If this is a registration (user with email doesn't exist), we keep the cookie, and remove it when we register, so the user
	// can complete the registration if they've accidentally closed their tab

	gc := helpers.GinContextFromContext(ctx)

	// Redeem our authentication cookie
	getRedeemedCookie, err := r.services.Eva().RedeemAuthenticationCookie(ctx, &eva.GetAuthenticationCookieRequest{Cookie: cookie})

	// Cookie is expired or not valid - send back nil
	if err != nil {
		return nil, nil
	}

	// Our cookie
	redeemedCookie := &models.Cookie{
		Registered:  false,
		SameSession: true,
		Redeemed:    true,
		Session:     getRedeemedCookie.Session,
		Email:       getRedeemedCookie.Email,
	}

	currentCookie, err := helpers.ReadCookie(ctx, OTPKey)

	if err != nil {

		// Cookie doesn't exist
		if err == http.ErrNoCookie {

			redeemedCookie.SameSession = false

			r.rabbit.Publish("otp", getRedeemedCookie.Cookie, []byte(`ANOTHER_SESSION`), amqp.Transient)

			// No cookie exists, we want to give a different SameSession response
			return redeemedCookie, nil
		}

		return nil, err
	}

	// If cookie doesn't match the token used, then we will error out
	if currentCookie.Value != cookie {
		return nil, http.ErrNoCookie
	}

	// Check if user is registered
	getRegisteredUser, err := r.services.Eva().GetRegisteredEmail(ctx, &eva.GetRegisteredEmailRequest{Email: getRedeemedCookie.Email})

	if err != nil {
		return nil, err
	}

	redeemedCookie.Registered = getRegisteredUser.Username != ""

	// User doesn't exist, we ask to register
	if getRegisteredUser.Username == "" {
		r.rabbit.Publish("otp", currentCookie.Value, []byte(`SAME_SESSION`), amqp.Transient)
		return redeemedCookie, nil
	}

	// Delete our cookie, since we now know this user will be logged in
	_, err = r.services.Eva().DeleteAuthenticationCookie(ctx, &eva.GetAuthenticationCookieRequest{Cookie: currentCookie.Value})

	if err != nil {
		return nil, err
	}

	// Otherwise, we remove the cookie, and create a JWT token
	http.SetCookie(gc.Writer, &http.Cookie{Name: OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	// Create user session
	_, err = helpers.CreateUserSession(gc, r.redis, getRegisteredUser.Id)

	if err != nil {
		return nil, err
	}

	r.rabbit.Publish("otp", currentCookie.Value, []byte(`SAME_SESSION`), amqp.Transient)

	return redeemedCookie, nil
}

func (r *queryResolver) Authentication(ctx context.Context) (*models.Authentication, error) {
	user := helpers.UserFromContext(ctx)
	gc := helpers.GinContextFromContext(ctx)

	// User is logged in
	if user != nil {
		return &models.Authentication{User: &models.User{Username: user.Username}, Cookie: nil}, nil
	}

	// User is not logged in, let's check for an OTP token
	otpCookie, err := helpers.ReadCookie(ctx, OTPKey)

	// Error
	if err != nil {

		// Error says that this cookie doesn't exist
		if err == http.ErrNoCookie {
			return &models.Authentication{User: nil, Cookie: nil}, nil
		}

		return nil, err
	}

	// Get authentication cookie data, so we can check if it's been redeemed yet
	getAuthenticationCookie, err := r.services.Eva().GetAuthenticationCookie(ctx, &eva.GetAuthenticationCookieRequest{Cookie: otpCookie.Value})

	// Check to make sure we didn't get an error, and our cookie isn't expired
	if err != nil {
		// Cookie doesn't exist, remove it
		http.SetCookie(gc.Writer, &http.Cookie{Name: OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})
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
	getRegisteredUser, err := r.services.Eva().GetRegisteredEmail(ctx, &eva.GetRegisteredEmailRequest{Email: getAuthenticationCookie.Email})

	if err != nil {
		return nil, err
	}

	cookie.Registered = getRegisteredUser.Username != ""

	// User not registered, we tell them to register
	if getRegisteredUser.Username == "" {
		return &models.Authentication{User: nil, Cookie: cookie}, nil
	}

	// make sure we delete this redeemed authentication cookie
	_, err = r.services.Eva().DeleteAuthenticationCookie(ctx, &eva.GetAuthenticationCookieRequest{Cookie: otpCookie.Value})

	if err != nil {
		return nil, err
	}

	// Remove OTP cookie - user is registered
	http.SetCookie(gc.Writer, &http.Cookie{Name: OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	// User registered, Create user session
	_, err = helpers.CreateUserSession(gc, r.redis, getRegisteredUser.Id)

	if err != nil {
		return nil, err
	}

	// Return user, since we logged in
	return &models.Authentication{User: &models.User{Username: getRegisteredUser.Username}, Cookie: cookie}, nil
}

// Query returns gen.QueryResolver implementation.
func (r *Resolver) Query() gen.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
