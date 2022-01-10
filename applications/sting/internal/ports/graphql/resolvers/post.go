package resolvers

import (
	"context"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type PostResolver struct {
	App *app.Application
}

func (p PostResolver) ViewerLiked(ctx context.Context, obj *types.Post) (*types.PostLike, error) {

	// non-authed users will just return nil
	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, nil
	}

	postLike, err := p.App.Queries.PostLikeById.Handle(ctx, query.PostLikeById{
		Principal: principal.FromContext(ctx),
		PostId:    obj.ID.GetID(),
		AccountId: principal.FromContext(ctx).AccountId(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostLikeToGraphQL(ctx, postLike), nil
}

func (p PostResolver) Content(ctx context.Context, obj *types.Post) ([]*types.Resource, error) {
	return obj.Content, nil
}
