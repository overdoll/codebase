package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"net/http"
	evav1 "project01101000/codebase/applications/eva/proto"
	"project01101000/codebase/applications/hades/gen"
	"project01101000/codebase/applications/hades/model"
	"project01101000/codebase/applications/hades/src/authentication"
	"project01101000/codebase/applications/hades/src/helpers"
	"time"
)

func (r *mutationResolver) Authenticate(ctx context.Context, email *string) (*model.Authentication, error) {
	// Authenticate - Generate an OTP code that will be used to authenticate the user
	// if user opens the link in the same browser, then we automatically authorize them
	// if not, then we redeem the cookie and the original browser should be logged in,
	// provided that the tab is still open

	gc, err := helpers.GinContextFromContext(ctx)

	if err != nil {
		return nil, err
	}

	// Create an authentication cookie
	getCookieResponse, err := r.services.Eva().CreateAuthenticationCookie(ctx, &evav1.CreateAuthenticationCookieRequest{Email: *email})

	if err != nil {
		return nil, err
	}

	expiration := time.Now().Add(5 * time.Minute)

	// OTP login cookie - will determine if
	// Opened in the same browser - log them in that browser if this cookie exists
	// Otherwise, if opened in another browser (such as the phone), it will log them in on the original browser through a subscription
	http.SetCookie(gc.Writer, &http.Cookie{Name: "otp-cookie", Value: getCookieResponse.Cookie.Cookie, Expires: expiration, HttpOnly: true, Secure: false})

	return &model.Authentication{Success: true}, nil
}

func (r *mutationResolver) RedeemCookie(ctx context.Context, cookie *string) (*model.SameSession, error) {
	// This will redeem the cookie
	// occurs when the user clicks on the "link" that they get in the email
	// and will tell them if the target that clicked on it is in the same session

	gc, err := helpers.GinContextFromContext(ctx)

	if err != nil {
		return nil, err
	}

	// Redeem our authentication cookie
	getRedeemedCookie, err := r.services.Eva().RedeemAuthenticationCookie(ctx, &evav1.GetAuthenticationCookieRequest{Cookie: *cookie})

	// Check to make sure we didn't get an error, and our cookie isn't expired
	if err != nil || getRedeemedCookie == nil {
		return nil, err
	}

	currentCookie, err := gc.Request.Cookie("otp-cookie")

	if err != nil || currentCookie == nil {
		// No cookie exists, we want to give a different SameSession response
		return &model.SameSession{Same: false}, nil
	}

	return &model.SameSession{Same: true}, nil
}

func (r *mutationResolver) Authorize(ctx context.Context) (*model.AccountData, error) {
	// Authorize - this is when the user uses the redeemed cookie. This will
	// occur when the user uses the redeemed cookie in the same browser that has the 'otp-cookie' cookie

	// If this is a login (user with email exists), we remove the otp-cookie & pass account data.

	// If this is a registration (user with email doesn't exist), we keep the cookie, and remove it when we register, so the user
	// can complete the registration if they've accidentally closed their tab

	gc, err := helpers.GinContextFromContext(ctx)

	if err != nil {
		return nil, err
	}

	// We want to make sure that this method is ONLY ran when we have the cookie
	currentCookie, err := gc.Request.Cookie("otp-cookie")
	if err != nil || currentCookie == nil {
		return nil, err
	}

	getAuthenticationCookie, err := r.services.Eva().GetAuthenticationCookie(ctx, &evav1.GetAuthenticationCookieRequest{Cookie: currentCookie.Value})

	// Check to make sure we didn't get an error, and our cookie isn't expired
	if err != nil {
		return nil, err
	}

	getRegisteredUser, err := r.services.Eva().GetRegisteredEmail(ctx, &evav1.GetRegisteredEmailRequest{Email: getAuthenticationCookie.Cookie.Email})

	if err != nil {
		return nil, err
	}

	// User doesn't exist, we ask to register
	if getRegisteredUser.Username == "" {
		return &model.AccountData{Registered: false}, nil
	}

	// Otherwise, we remove the cookie, and create a JWT token
	http.SetCookie(gc.Writer, &http.Cookie{Name: "otp-cookie", Value: "", MaxAge: -1, HttpOnly: true, Secure: false})

	// Create JWT token
	jwt := authentication.JWTAuthService()

	expiration := time.Now().Add(time.Hour * 120).Unix()

	token := jwt.GenerateToken(getRegisteredUser.Username, expiration)

	// Set session cookie
	http.SetCookie(gc.Writer, &http.Cookie{Name: "session", Value: token, HttpOnly: true, Secure: false})

	// TODO: add token to redis

	return &model.AccountData{Registered: true}, nil
}

func (r *mutationResolver) Register(ctx context.Context, username *string) (*model.Registration, error) {
	gc, err := helpers.GinContextFromContext(ctx)

	if err != nil {
		return nil, err
	}

	// Make sure we have the cookie in order to register
	currentCookie, err := gc.Request.Cookie("otp-cookie")

	if err != nil || currentCookie == nil {
		return nil, err
	}

	// Get our cookie so we can get our email
	getAuthenticationCookie, err := r.services.Eva().GetAuthenticationCookie(ctx, &evav1.GetAuthenticationCookieRequest{Cookie: currentCookie.Value})

	if err != nil {
		return nil, err
	}

	// Register our user
	getRegisteredUser, err := r.services.Eva().RegisterUser(ctx, &evav1.RegisterUserRequest{Username: *username, Email: getAuthenticationCookie.Cookie.Email})

	if err != nil {
		return nil, err
	}

	// Remove OTP token - registration is complete
	http.SetCookie(gc.Writer, &http.Cookie{Name: "otp-cookie", Value: "", MaxAge: -1, HttpOnly: true, Secure: false})

	// Create JWT token
	jwt := authentication.JWTAuthService()

	expiration := time.Now().Add(time.Hour * 120).Unix()

	token := jwt.GenerateToken(getRegisteredUser.Username, expiration)

	// TODO: add token to redis

	// Set session cookie
	http.SetCookie(gc.Writer, &http.Cookie{Name: "session", Value: token, HttpOnly: true, Secure: false})

	return &model.Registration{Username: getRegisteredUser.Username}, nil
}

func (r *mutationResolver) Logout(ctx context.Context) (bool, error) {
	// Log user out from session by removing token from redis and cookie from browser

	return true, nil
}

// Mutation returns gen.MutationResolver implementation.
func (r *Resolver) Mutation() gen.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
