package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	gen1 "project01101000/codebase/applications/hades/gen"
	model1 "project01101000/codebase/applications/hades/model"
)

func (r *queryResolver) Users(ctx context.Context, id *string, username *string, email *string) ([]*model1.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Query returns gen1.QueryResolver implementation.
func (r *Resolver) Query() gen1.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
