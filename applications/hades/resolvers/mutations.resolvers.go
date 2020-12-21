package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	gen1 "project01101000/codebase/applications/hades/gen"
	model1 "project01101000/codebase/applications/hades/model"
	"context"
	"fmt"
)

func (r *mutationResolver) CreateBook(ctx context.Context, inputData model1.BookInput) (*model1.Book, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) DeleteBook(ctx context.Context, id string) (bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) TakeBookInUse(ctx context.Context, holderID string, bookID string) (bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) ReturnBook(ctx context.Context, holderID string, bookID string) (bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreateHolder(ctx context.Context, inputData model1.HolderInput) (*model1.Holder, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns gen1.MutationResolver implementation.
func (r *Resolver) Mutation() gen1.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
