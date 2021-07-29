package mutations

import (
	"context"

	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/applications/sting/internal/ports/temporal/workflows"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type MutationResolver struct {
	App    *app.Application
	Client client.Client
}

func (r *MutationResolver) CreatePost(ctx context.Context, input types.CreatePostInput) (*types.CreatePostPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	requests := make(map[string]string)

	for _, item := range input.CharacterRequests {

		if item.CustomMediaName != nil {
			requests[item.Name] = *item.CustomMediaName
		}

		if item.ExistingMediaID != nil {
			requests[item.Name] = item.ExistingMediaID.GetID()
		}

	}

	var artistId *string

	if input.ExistingArtist != nil {
		id := input.ExistingArtist.GetID()
		artistId = &id
	}

	posterIsArtist := false

	if input.PosterIsArtist != nil {
		posterIsArtist = *input.PosterIsArtist
	}

	var characterIds []string

	for _, char := range input.CharacterIds {
		characterIds = append(characterIds, char.GetID())
	}

	var categoryIds []string

	for _, cat := range input.CategoryIds {
		categoryIds = append(categoryIds, cat.GetID())
	}

	pst, err := r.App.Commands.CreatePost.
		Handle(
			ctx,
			command.CreatePost{
				Principal:            principal.FromContext(ctx),
				ExistingArtistId:     artistId,
				CustomArtistUsername: input.CustomArtistUsername,
				PosterIsArtist:       posterIsArtist,
				Content:              input.Content,
				CharacterIds:         characterIds,
				CategoryIds:          categoryIds,
				CharacterRequests:    requests,
				MediaRequests:        input.MediaRequests,
			},
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
