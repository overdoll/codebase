package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"net/http"
	evav1 "project01101000/codebase/applications/eva/proto"
	gen "project01101000/codebase/applications/hades/src"
	"project01101000/codebase/applications/hades/src/authentication"
	"project01101000/codebase/applications/hades/src/helpers"
	"project01101000/codebase/applications/hades/src/models"
	"time"
)

func (r *subscriptionResolver) AuthenticationState(ctx context.Context) (<-chan *models.AuthenticationState, error) {
	// AuthenticationState - check the state of our authentication by checking the OTP Cookie header to see if we have redeemed it

	out := make(chan *models.AuthenticationState)

	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := gc.Request.Cookie("otp-cookie")

	if err != nil || currentCookie == nil {
		close(out)
		return nil, err
	}

	// Get our cookie so we can get our email
	getAuthenticationCookie, err := r.services.Eva().GetAuthenticationCookie(ctx, &evav1.GetAuthenticationCookieRequest{Cookie: currentCookie.Value})

	// It could happen that the cookie was deleted - if so, then we should tell the user that the token has been redeemed
	if err != nil {
		close(out)
		return nil, err
	}

	if getAuthenticationCookie.Cookie.Redeemed == false {
		out <- &models.AuthenticationState{Authorized: false, Registered: false}
		return out, nil
	}

	getRegisteredUser, err := r.services.Eva().GetRegisteredEmail(ctx, &evav1.GetRegisteredEmailRequest{Email: getAuthenticationCookie.Cookie.Email})

	if err != nil {
		return nil, err
	}

	// Delete our cookie
	getDeletedCookie, err := r.services.Eva().DeleteAuthenticationCookie(ctx, &evav1.GetAuthenticationCookieRequest{Cookie: currentCookie.Value})

	if err != nil || getDeletedCookie == nil {
		return nil, err
	}

	// User doesn't exist, we ask to register
	if getRegisteredUser.Username == "" {
		out <- &models.AuthenticationState{Authorized: true, Registered: false}
		return out, nil
	}

	// Otherwise, we remove the cookie, and create a JWT token
	http.SetCookie(gc.Writer, &http.Cookie{Name: OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: false, Path: "/"})

	// Create JWT token
	jwtService := authentication.JWTAuthService()

	expiration := time.Now().Add(time.Hour * 120).Unix()

	token := jwtService.GenerateToken(getRegisteredUser.Username, expiration)

	// Set session cookie
	http.SetCookie(gc.Writer, &http.Cookie{Name: "session", Value: token, HttpOnly: true, Secure: false, Path: "/"})

	// Add to redis set for this user's session tokens
	// TODO: Should capture stuff like IP, location, header so we can show the user the devices that are logged in for them
	val, err := r.redis.Do("SSAD", "session:"+getRegisteredUser.Username, token)

	if val == nil || err != nil {
		return nil, err
	}

	out <- &models.AuthenticationState{Authorized: true, Registered: true}
	return out, nil
}

// Subscription returns gen.SubscriptionResolver implementation.
func (r *Resolver) Subscription() gen.SubscriptionResolver { return &subscriptionResolver{r} }

type subscriptionResolver struct{ *Resolver }
