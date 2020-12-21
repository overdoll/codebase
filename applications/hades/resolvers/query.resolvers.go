package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	evav1 "project01101000/codebase/applications/eva/proto"
	"project01101000/codebase/applications/hades/gen"
	"project01101000/codebase/applications/hades/model"
)

func (r *queryResolver) Users(ctx context.Context, id *string, username *string, email *string) ([]*model.User, error) {

	users := []*model.User{}

	if id != nil {
		getUserResponse, err := r.services.Eva().GetUser(ctx, &evav1.GetUserRequest{Id: *id})
		if err != nil {
			return nil, err
		}
		users = append(users, service2GraphUser(getUserResponse.User))
	}

	return users, nil
}

// Query returns gen1.QueryResolver implementation.
func (r *Resolver) Query() gen.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
