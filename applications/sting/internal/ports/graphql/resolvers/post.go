package resolvers

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type PostResolver struct {
	App *app.Application
}

func (r PostResolver) SuggestedPosts(ctx context.Context, obj *types.Post, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.SuggestedPostsForPost.Handle(ctx, query.SuggestedPostsForPost{
		PostId:    obj.ID.GetID(),
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}

func (r PostResolver) ViewerLiked(ctx context.Context, obj *types.Post) (*types.PostLike, error) {

	// non-authed users will just return nil
	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, nil
	}

	postLike, err := r.App.Queries.PostLikeById.Handle(ctx, query.PostLikeById{
		Principal: principal.FromContext(ctx),
		PostId:    obj.ID.GetID(),
		AccountId: principal.FromContext(ctx).AccountId(),
	})

	if err != nil {

		if err == post.ErrLikeNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalPostLikeToGraphQL(ctx, postLike), nil
}
