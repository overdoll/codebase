package mutations

import (
	"context"

	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/libraries/passport"
)

type MutationResolver struct {
	App    *app.Application
	Client client.Client
}

func (r *MutationResolver) UpdatePost(ctx context.Context, id string, data *types.PostInput) (*types.PostUpdateResponse, error) {
	requests := make(map[string]string)

	for _, item := range data.CharacterRequests {
		requests[item.Name] = item.Media
	}

	_, err := r.App.Commands.UpdatePendingPost.
		Handle(
			ctx,
			id,
			*data.ArtistID,
			data.Characters,
			data.Categories,
			requests,
			data.MediaRequests,
			[]string{},
		)

	if err != nil {
		return nil, err
	}

	return &types.PostUpdateResponse{Validation: nil}, nil
}

func (r *MutationResolver) Post(ctx context.Context, data *types.PostInput) (*types.PostResponse, error) {

	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	requests := make(map[string]string)

	for _, item := range data.CharacterRequests {
		requests[item.Name] = item.Media
	}

	post, err := r.App.Commands.CreatePendingPost.
		Handle(
			ctx,
			pass.UserID(),
			*data.ArtistID,
			data.ArtistUsername,
			data.Content,
			data.Characters,
			data.Categories,
			requests,
			data.MediaRequests,
		)

	if err != nil {
		return nil, err
	}

	if post == nil {
		return &types.PostResponse{
			Review:     false,
			Validation: &types.Validation{Code: "is not valid"},
		}, err
	}

	return &types.PostResponse{
		Review:     false,
		Validation: nil,
	}, err
}
