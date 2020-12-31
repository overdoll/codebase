package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	evav1 "project01101000/codebase/applications/eva/proto"
	gen "project01101000/codebase/applications/hades/src"
	"project01101000/codebase/applications/hades/src/helpers"
	"project01101000/codebase/applications/hades/src/models"
)

func (r *queryResolver) User(ctx context.Context, username *string) (*string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) RedeemCookie(ctx context.Context, cookie *string) (*models.SameSession, error) {
	// This will redeem the cookie
	// occurs when the user clicks on the "link" that they get in the email
	// and will tell them if the target that clicked on it is in the same session

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
		return &models.SameSession{Same: false}, nil
	}

	return &models.SameSession{Same: true}, nil
}

func (r *queryResolver) JoinState(ctx context.Context) (*models.JoinState, error) {
	panic(fmt.Errorf("not implemented"))
}

// Query returns gen.QueryResolver implementation.
func (r *Resolver) Query() gen.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
