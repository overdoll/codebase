package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"project01101000/codebase/applications/hades/gen"
	"project01101000/codebase/applications/hades/model"
)

func (r *subscriptionResolver) AuthenticationState(ctx context.Context) (<-chan *model.AuthenticationState, error) {
	// AuthenticationState - check the state of our authentication by checking the OTP Cookie header to see if we have redeemed it

	panic(fmt.Errorf("not implemented"))
}

// Subscription returns gen.SubscriptionResolver implementation.
func (r *Resolver) Subscription() gen.SubscriptionResolver { return &subscriptionResolver{r} }

type subscriptionResolver struct{ *Resolver }
