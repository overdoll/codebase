package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"net/http"
	evav1 "project01101000/codebase/applications/eva/proto"
	gen "project01101000/codebase/applications/hades/src"
	"project01101000/codebase/applications/hades/src/helpers"
	"project01101000/codebase/applications/hades/src/models"
	"time"
)

func (r *mutationResolver) Authenticate(ctx context.Context, email *string) (*models.Authentication, error) {
	// Authenticate - Generate an OTP code that will be used to authenticate the user
	// if user opens the link in the same browser, then we automatically authorize them
	// if not, then we redeem the cookie and the original browser should be logged in,
	// provided that the tab is still open

	gc := helpers.GinContextFromContext(ctx)

	// Create an authentication cookie
	getCookieResponse, err := r.services.Eva().CreateAuthenticationCookie(ctx, &evav1.CreateAuthenticationCookieRequest{Email: *email})

	if err != nil {
		return nil, err
	}

	expiration := time.Now().Add(5 * time.Minute)

	// OTP login cookie - will determine if
	// Opened in the same browser - log them in that browser if this cookie exists
	// Otherwise, if opened in another browser (such as the phone), it will log them in on the original browser through a subscription
	http.SetCookie(gc.Writer, &http.Cookie{Name: OTPKey, Value: getCookieResponse.Cookie.Cookie, Expires: expiration, HttpOnly: true, Secure: false, Path: "/"})

	return &models.Authentication{Success: true}, nil
}

func (r *mutationResolver) Register(ctx context.Context, username *string) (*models.Registration, error) {
	gc := helpers.GinContextFromContext(ctx)

	// Make sure we have the cookie in order to register
	currentCookie, err := gc.Request.Cookie(OTPKey)

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

	// Delete our cookie
	getDeletedCookie, err := r.services.Eva().DeleteAuthenticationCookie(ctx, &evav1.GetAuthenticationCookieRequest{Cookie: currentCookie.Value})

	if err != nil || getDeletedCookie == nil {
		return nil, err
	}

	// Remove OTP token - registration is complete
	http.SetCookie(gc.Writer, &http.Cookie{Name: OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: false, Path: "/"})

	_, err = helpers.CreateUserSession(gc, r.redis, getRegisteredUser.Username)

	if err != nil {
		return nil, err
	}

	return &models.Registration{Username: getRegisteredUser.Username}, nil
}

func (r *mutationResolver) Logout(ctx context.Context) (bool, error) {
	// Log user out from session by removing token from redis and cookie from browser
	gc := helpers.GinContextFromContext(ctx)

	user := helpers.UserFromContext(ctx)

	// remove session from redis
	val, err := r.redis.Do("SREM", "session:"+user.Username, user.Token)

	if val == nil || err != nil {
		return false, err
	}

	// clear session cookie
	http.SetCookie(gc.Writer, &http.Cookie{Name: "session", Value: "", MaxAge: -1, HttpOnly: true, Secure: false, Path: "/"})

	return true, nil
}

// Mutation returns gen.MutationResolver implementation.
func (r *Resolver) Mutation() gen.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
