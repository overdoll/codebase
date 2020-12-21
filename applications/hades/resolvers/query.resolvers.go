package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	gen1 "project01101000/codebase/applications/hades/gen"
	model1 "project01101000/codebase/applications/hades/model"
	"context"
	"fmt"
)

func (r *queryResolver) Books(ctx context.Context, id *string, isbn *string, holderID *string) ([]*model1.Book, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Holders(ctx context.Context, id *string, bookID *string) ([]*model1.Holder, error) {
	panic(fmt.Errorf("not implemented"))
}

// Query returns gen1.QueryResolver implementation.
func (r *Resolver) Query() gen1.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
