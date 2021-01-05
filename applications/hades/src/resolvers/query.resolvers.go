package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"net/http"
	evav1 "project01101000/codebase/applications/eva/proto"
	gen "project01101000/codebase/applications/hades/src"
	"project01101000/codebase/applications/hades/src/helpers"
	"project01101000/codebase/applications/hades/src/models"
)

func (r *queryResolver) User(ctx context.Context, username *string) (*string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) RedeemCookie(ctx context.Context, cookie *string) (*models.AccountData, error) {
	// RedeemCookie - this is when the user uses the redeemed cookie. This will
	// occur when the user uses the redeemed cookie in the same browser that has the 'otp-cookie' cookie

	// If this is a login (user with email exists), we remove the otp-cookie & pass account data.

	// If this is a registration (user with email doesn't exist), we keep the cookie, and remove it when we register, so the user
	// can complete the registration if they've accidentally closed their tab

	gc := helpers.GinContextFromContext(ctx)

	// Redeem our authentication cookie
	getRedeemedCookie, err := r.services.Eva().RedeemAuthenticationCookie(ctx, &evav1.GetAuthenticationCookieRequest{Cookie: *cookie})

	// Check to make sure we didn't get an error, and our cookie isn't expired
	if err != nil || getRedeemedCookie == nil {
		return nil, err
	}

	currentCookie, err := helpers.ReadCookie(ctx, OTPKey)

	if err != nil || currentCookie == nil {
		r.redis.Send("PUBLISH", "otp"+getRedeemedCookie.Cookie.Cookie, "ANOTHER_SESSION")
		r.redis.Flush()

		// No cookie exists, we want to give a different SameSession response
		return &models.AccountData{Registered: false, SameSession: false}, nil
	}

	// Check if user is registered
	getRegisteredUser, err := r.services.Eva().GetRegisteredEmail(ctx, &evav1.GetRegisteredEmailRequest{Email: getRedeemedCookie.Cookie.Email})

	if err != nil {
		return nil, err
	}

	// User doesn't exist, we ask to register
	if getRegisteredUser.Username == "" {
		r.redis.Send("PUBLISH", "otp"+currentCookie.Value, "SAME_SESSION")
		r.redis.Flush()
		return &models.AccountData{Registered: false, SameSession: true}, nil
	}

	// Delete our cookie, since we now know this user will be logged in
	getDeletedCookie, err := r.services.Eva().DeleteAuthenticationCookie(ctx, &evav1.GetAuthenticationCookieRequest{Cookie: currentCookie.Value})

	if err != nil || getDeletedCookie == nil {
		return nil, err
	}

	// Otherwise, we remove the cookie, and create a JWT token
	http.SetCookie(gc.Writer, &http.Cookie{Name: OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	// Create user session
	_, err = helpers.CreateUserSession(gc, r.redis, getRegisteredUser.Username)

	if err != nil {
		return nil, err
	}

	r.redis.Send("PUBLISH", "otp"+currentCookie.Value, "SAME_SESSION")
	r.redis.Flush()

	return &models.AccountData{Registered: true, SameSession: true}, nil
}

func (r *queryResolver) JoinState(ctx context.Context) (*models.JoinState, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) State(ctx context.Context) (*models.UserState, error) {
	user := helpers.UserFromContext(ctx)
	gc := helpers.GinContextFromContext(ctx)

	// User is logged in
	if user != nil {
		return &models.UserState{User: &models.User{Username: user.Username}, TokenData: nil}, nil
	}

	// User is not logged in, let's check for an OTP token
	otpCookie, err := helpers.ReadCookie(ctx, OTPKey)

	// Error
	if err != nil {

		// Error says that this cookie doesn't exist
		if err == http.ErrNoCookie {
			return &models.UserState{User: nil, TokenData: nil}, nil
		}

		return nil, err
	}

	// Get authentication cookie data, so we can check if it's been redeemed yet
	getAuthenticationCookie, err := r.services.Eva().GetAuthenticationCookie(ctx, &evav1.GetAuthenticationCookieRequest{Cookie: otpCookie.Value})

	// Check to make sure we didn't get an error, and our cookie isn't expired
	if err != nil {
		return nil, err
	}

	// Not yet redeemed, user needs to redeem it still
	if getAuthenticationCookie.Cookie.Redeemed == false {
		return &models.UserState{User: nil, TokenData: &models.Token{Redeemed: false, Registered: false}}, nil
	}

	// Cookie redeemed, check if user is registered
	getRegisteredUser, err := r.services.Eva().GetRegisteredEmail(ctx, &evav1.GetRegisteredEmailRequest{Email: getAuthenticationCookie.Cookie.Email})

	if err != nil {
		return nil, err
	}

	// User not registered, we tell them to register
	if getRegisteredUser.Username == "" {
		return &models.UserState{User: nil, TokenData: &models.Token{Redeemed: true, Registered: false}}, nil
	}

	// Remove OTP cookie - user is registered
	http.SetCookie(gc.Writer, &http.Cookie{Name: OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	// User registered, Create user session
	_, err = helpers.CreateUserSession(gc, r.redis, getRegisteredUser.Username)

	if err != nil {
		return nil, err
	}

	// Return user, since we logged in
	return &models.UserState{User: &models.User{Username: getRegisteredUser.Username}, TokenData: &models.Token{Redeemed: true, Registered: true}}, nil
}

// Query returns gen.QueryResolver implementation.
func (r *Resolver) Query() gen.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
