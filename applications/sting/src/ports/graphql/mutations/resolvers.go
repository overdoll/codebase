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

	requests := make(map[string]string)

	for _, item := range input.CharacterRequests {
		requests[item.Name] = item.Media
	}

	artistId := ""

	if input.ExistingArtist != nil {
		artistId = input.ExistingArtist.GetID()
	}

	artistUsername := ""

	if input.CustomArtistUsername != nil {
		artistUsername = *input.CustomArtistUsername
	}

	post, err := r.App.Commands.CreatePendingPost.
		Handle(
			ctx,
			passport.FromContext(ctx).AccountID(),
			artistId,
			artistUsername,
			input.Content,
			input.CharacterIds,
			input.CategoryIds,
			requests,
			input.MediaRequests,
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

	isReview := false

	return &types.CreatePendingPostPayload{
		Review:      &isReview,
		PendingPost: types.MarshalPendingPostToGraphQL(post),
	}, err
}
