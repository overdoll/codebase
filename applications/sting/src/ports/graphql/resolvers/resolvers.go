package resolvers

import (
	"context"

	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/libraries/graphql"
	"overdoll/libraries/passport"
)

type AccountResolver struct {
	App *app.Application
}

func (a AccountResolver) PendingPostsForModerator(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PendingPostConnection, error) {
	panic("implement me")
}

func (a AccountResolver) PendingPosts(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PendingPostConnection, error) {

	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	moderatorId := ""
	contributorId := ""
	artistId := ""
	id := ""

	if filter != nil {
		if filter.ModeratorID != nil {
			moderatorId = *filter.ModeratorID
		}

		if filter.ContributorID != nil {
			contributorId = *filter.ContributorID
		}

		if filter.ArtistID != nil {
			artistId = *filter.ArtistID
		}

		if filter.ID != nil {
			id = *filter.ID
		}
	}

	var startCursor *string
	var endCursor *string

	input := &graphql.ConnectionInput{
		After:  after,
		Before: before,
		First:  first,
		Last:   last,
	}

	results, err := r.App.Queries.GetPendingPosts.Handle(ctx, input.ToCursor(), moderatorId, contributorId, artistId, id, pass.AccountID())

	if err != nil {
		return nil, err
	}

	var posts []*types.PendingPostEdge

	for _, result := range results.Edges {
		posts = append(posts, types.MarshalPendingPostToGraphQL(result))
	}

	if len(posts) > 0 {
		startCursor = &posts[0].Cursor
		endCursor = &posts[len(posts)-1].Cursor
	}

	return &types.PendingPostConnection{
		Edges: posts,
		PageInfo: &graphql.PageInfo{
			HasNextPage:     results.PageInfo.HasNextPage(),
			HasPreviousPage: results.PageInfo.HasPrevPage(),
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
	}, nil
}

func (a AccountResolver) Posts(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {
	panic("implement me")
}

func (a AccountResolver) Contributions(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {
	panic("implement me")
}
