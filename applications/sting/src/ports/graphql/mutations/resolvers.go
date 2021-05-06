package mutations

import (
	"context"

	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
)

type MutationResolver struct {
	App app.Application
}

func (r *MutationResolver) Post(ctx context.Context, data *types.PostInput) (*types.PostResponse, error) {

	requests := make(map[string]string)

	for _, item := range data.CharacterRequests {
		requests[item.Name] = item.Media
	}

	post, err := r.App.Commands.CreatePendingPost.
		Handle(
			ctx,
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
