package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"net/http"
	evav1 "project01101000/codebase/applications/eva/proto"
	gen "project01101000/codebase/applications/hades/src"
	"project01101000/codebase/applications/hades/src/authentication"
	"project01101000/codebase/applications/hades/src/helpers"
	"project01101000/codebase/applications/hades/src/models"
	"time"
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

	// We want to make sure that this method is ONLY ran when we have the cookie

	gc := helpers.GinContextFromContext(ctx)

	// Redeem our authentication cookie
	getRedeemedCookie, err := r.services.Eva().RedeemAuthenticationCookie(ctx, &evav1.GetAuthenticationCookieRequest{Cookie: *cookie})

	// Check to make sure we didn't get an error, and our cookie isn't expired
	if err != nil || getRedeemedCookie == nil {
		return nil, err
	}

	currentCookie, err := gc.Request.Cookie(OTPKey)

	if err != nil || currentCookie == nil {
		// No cookie exists, we want to give a different SameSession response
		return &models.AccountData{Registered: false, SameSession: false}, nil
	}

	getRegisteredUser, err := r.services.Eva().GetRegisteredEmail(ctx, &evav1.GetRegisteredEmailRequest{Email: getRedeemedCookie.Cookie.Email})

	if err != nil {
		return nil, err
	}

	// Delete our cookie
	getDeletedCookie, err := r.services.Eva().DeleteAuthenticationCookie(ctx, &evav1.GetAuthenticationCookieRequest{Cookie: currentCookie.Value})

	fmt.Println("test")

	if err != nil || getDeletedCookie == nil {
		return nil, err
	}

	// User doesn't exist, we ask to register
	if getRegisteredUser.Username == "" {
		return &models.AccountData{Registered: false, SameSession: true}, nil
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

	return &models.AccountData{Registered: true, SameSession: true}, nil
}

func (r *queryResolver) JoinState(ctx context.Context) (*models.JoinState, error) {
	panic(fmt.Errorf("not implemented"))
}

// Query returns gen.QueryResolver implementation.
func (r *Resolver) Query() gen.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
