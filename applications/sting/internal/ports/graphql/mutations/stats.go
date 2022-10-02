package mutations

import (
	"context"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) ObservePosts(ctx context.Context, input types.ObservePostsInput) (*types.ObservePostsPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	var targetPostIds []string

	for _, postId := range input.PostIds {
		targetPostIds = append(targetPostIds, postId.GetID())
	}

	postIds, err := r.App.Commands.ObservePosts.
		Handle(
			ctx,
			command.ObservePosts{
				Principal: principal.FromContext(ctx),
				PostIds:   targetPostIds,
			},
		)

	if err != nil {
		return nil, err
	}

	var posts []*types.Post

	for _, postId := range postIds {
		posts = append(posts, &types.Post{ID: relay.NewID(types.Post{}, postId)})
	}

	return &types.ObservePostsPayload{Posts: posts}, nil
}
