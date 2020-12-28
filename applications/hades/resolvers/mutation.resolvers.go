package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"net/http"
	evav1 "project01101000/codebase/applications/eva/proto"
	"project01101000/codebase/applications/hades/gen"
	"project01101000/codebase/applications/hades/model"
	"project01101000/codebase/applications/hades/src/helpers"
	"time"
)

func (r *mutationResolver) Authenticate(ctx context.Context, email *string) (*model.Authentication, error) {
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
	http.SetCookie(gc.Writer, &http.Cookie{Name: "otp-cookie", Value: getCookieResponse.Cookie.Cookie, Expires: expiration, HttpOnly: true, Domain: "localhost", Secure: false})

	return &model.Authentication{Success: true}, nil
}

func (r *mutationResolver) Authorize(ctx context.Context) (*model.AccountData, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) Register(ctx context.Context, username *string) (*model.Registration, error) {
	//service := authentication.JWTAuthService()

	//expiration := time.Now().Add(time.Hour * 48).Unix()

	//token := service.GenerateToken(getRegisteredResponse.Username, expiration)

	//if token != "" {
	//	return nil, err
	//}

	panic(fmt.Errorf("not implemented"))
}

// Mutation returns gen.MutationResolver implementation.
func (r *Resolver) Mutation() gen.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
