package mutations

import (
	"context"

	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/applications/sting/src/ports/temporal/workflows"
	"overdoll/libraries/passport"
)

type MutationResolver struct {
	App    *app.Application
	Client client.Client
}

func (r *MutationResolver) CreatePendingPost(ctx context.Context, input types.CreatePendingPostInput) (*types.CreatePendingPostPayload, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	requests := make(map[string]string)

	for _, item := range data.CharacterRequests {
		requests[item.Name] = item.Media
	}

	artistId := ""

	if data.ArtistID != nil {
		artistId = *data.ArtistID
	}

	artistUsername := ""

	if data.ArtistUsername != nil {
		artistUsername = *data.ArtistUsername
	}

	post, err := r.App.Commands.CreatePendingPost.
		Handle(
			ctx,
			pass.AccountID(),
			artistId,
			artistUsername,
			data.Content,
			data.Characters,
			data.Categories,
			requests,
			data.MediaRequests,
		)

	if err != nil {
		return nil, err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "NewCreatePendingPostWorkflow_" + post.ID(),
	}

	_, err = r.Client.ExecuteWorkflow(ctx, options, workflows.CreatePost, post.ID())

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
		ID:         post.ID(),
		Validation: nil,
	}, err
}
