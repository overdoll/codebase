package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"github.com/gomodule/redigo/redis"
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
	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := gc.Request.Cookie(OTPKey)

	if err != nil || currentCookie == nil {

		if err == http.ErrNoCookie {
			// The program returns this error
			return nil, err
		}

		return nil, err
	}

	// Get our cookie so we can get our email
	getAuthenticationCookie, err := r.services.Eva().GetAuthenticationCookie(ctx, &evav1.GetAuthenticationCookieRequest{Cookie: currentCookie.Value})

	// It could happen that the cookie was deleted - if so, then we should tell the user that the token has been redeemed
	if err != nil {
		return nil, err
	}

	getRegisteredUser, err := r.services.Eva().GetRegisteredEmail(ctx, &evav1.GetRegisteredEmailRequest{Email: getAuthenticationCookie.Cookie.Email})

	if err != nil {
		return nil, err
	}

	channel := make(chan *models.AuthenticationState)

	go func() {
		r.redisPB.Subscribe("otp")

		if getAuthenticationCookie.Cookie.Redeemed == true {

			if getRegisteredUser.Username == "" {
				channel <- &models.AuthenticationState{Authorized: true, Registered: false, Redirect: false}
				return
			}

			// Otherwise, we remove the cookie, and create a JWT token
			http.SetCookie(gc.Writer, &http.Cookie{Name: OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: false, Path: "/"})

			// Create user session with username
			_, err := helpers.CreateUserSession(gc, r.redis, getRegisteredUser.Username)

			if err != nil {
				return
			}

			channel <- &models.AuthenticationState{Authorized: true, Registered: true, Redirect: false}
			return
		}

		for {
			switch v := r.redisPB.Receive().(type) {
			case redis.Message:

				if string(v.Data) == "SAME_SESSION" {
					channel <- &models.AuthenticationState{Authorized: true, Registered: false, Redirect: true}
					return

				} else if string(v.Data) == "ANOTHER_SESSION" {

					if getAuthenticationCookie.Cookie.Redeemed == false {
						channel <- &models.AuthenticationState{Authorized: false, Registered: false, Redirect: false}
						return
					}

					// Delete our cookie
					getDeletedCookie, err := r.services.Eva().DeleteAuthenticationCookie(ctx, &evav1.GetAuthenticationCookieRequest{Cookie: currentCookie.Value})

					if err != nil || getDeletedCookie == nil {
						return
					}

					// User doesn't exist, we ask to register
					if getRegisteredUser.Username == "" {
						channel <- &models.AuthenticationState{Authorized: true, Registered: false, Redirect: false}
						return
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
						return
					}

					channel <- &models.AuthenticationState{Authorized: true, Registered: true, Redirect: false}
					return
				}

			case error:
				return
			}
		}
	}()

	return channel, nil
}

// Subscription returns gen.SubscriptionResolver implementation.
func (r *Resolver) Subscription() gen.SubscriptionResolver { return &subscriptionResolver{r} }

type subscriptionResolver struct{ *Resolver }
