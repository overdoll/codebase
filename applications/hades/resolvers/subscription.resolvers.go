package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	evav1 "project01101000/codebase/applications/eva/proto"
	"project01101000/codebase/applications/hades/gen"
	"project01101000/codebase/applications/hades/model"
	"project01101000/codebase/applications/hades/src/helpers"
)

func (r *subscriptionResolver) AuthenticationState(ctx context.Context) (<-chan *model.AuthenticationState, error) {
	// AuthenticationState - check the state of our authentication by checking the OTP Cookie header to see if we have redeemed it

	out := make(chan *model.AuthenticationState)

	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := gc.Request.Cookie("otp-cookie")

	if err != nil || currentCookie == nil {
		close(out)
		return nil, err
	}

	// Get our cookie so we can get our email
	getAuthenticationCookie, err := r.services.Eva().GetAuthenticationCookie(ctx, &evav1.GetAuthenticationCookieRequest{Cookie: currentCookie.Value})

	if err != nil {
		close(out)
		return nil, err
	}

	out <- &model.AuthenticationState{Redeemed: getAuthenticationCookie.Cookie.Redeemed}

	return out, nil
}

// Subscription returns gen.SubscriptionResolver implementation.
func (r *Resolver) Subscription() gen.SubscriptionResolver { return &subscriptionResolver{r} }

type subscriptionResolver struct{ *Resolver }
