package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"project01101000/codebase/applications/hades/gen"
	"project01101000/codebase/applications/hades/model"
)

func (r *queryResolver) AuthenticationCookie(ctx context.Context, cookie *string) ([]*model.AuthenticationCookie, error) {
	panic(fmt.Errorf("not implemented"))
}

// Query returns gen.QueryResolver implementation.
func (r *Resolver) Query() gen.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
