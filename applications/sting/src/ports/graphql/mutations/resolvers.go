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

func (r *MutationResolver) CreatePost(ctx context.Context, input types.CreatePostInput) (*types.CreatePostPayload, error) {

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

	posterIsArtist := false

	if input.PosterIsArtist != nil {
		posterIsArtist = *input.PosterIsArtist
	}

	pst, err := r.App.Commands.CreatePost.
		Handle(
			ctx,
			passport.FromContext(ctx).AccountID(),
			artistId,
			artistUsername,
			posterIsArtist,
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
		ID:        "NewCreatePendingPostWorkflow_" + pst.ID(),
	}

	_, err = r.Client.ExecuteWorkflow(ctx, options, workflows.CreatePost, pst.ID())

	if err != nil {
		return nil, err
	}

	isReview := false

	return &types.CreatePostPayload{
		Review: &isReview,
		Post:   types.MarshalPostToGraphQL(pst),
	}, err
}
