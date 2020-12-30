package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	gen "project01101000/codebase/applications/hades/src"
	"project01101000/codebase/applications/hades/src/models"
)

func (r *queryResolver) User(ctx context.Context, username *string) (*string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) JoinState(ctx context.Context) (*models.JoinState, error) {
	panic(fmt.Errorf("not implemented"))
}

// Query returns gen.QueryResolver implementation.
func (r *Resolver) Query() gen.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
