package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/tilt-dev/tilt-example-bazel/graph/generated"
	"github.com/tilt-dev/tilt-example-bazel/graph/model"
)

func (r *entityResolver) FindUserByID(ctx context.Context, id string) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Entity returns generated.EntityResolver implementation.
func (r *Resolver) Entity() generated.EntityResolver { return &entityResolver{r} }

type entityResolver struct{ *Resolver }
