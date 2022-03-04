package resolvers

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"strings"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type ClubResolver struct {
	App *app.Application
}

func (r ClubResolver) Posts(ctx context.Context, obj *types.Club, after *string, before *string, first *int, last *int, audienceSlugs []string, categorySlugs []string, characterSlugs []string, seriesSlugs []string, state *types.PostState, supporterOnlyStatus []types.SupporterOnlyStatus, sortBy types.PostsSort) (*types.PostConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	var stateModified *string

	if state != nil {
		str := state.String()
		stateModified = &str
	}

	var supporterOnly []string

	for _, s := range supporterOnlyStatus {
		supporterOnly = append(supporterOnly, s.String())
	}

	results, err := r.App.Queries.SearchPosts.Handle(ctx, query.SearchPosts{
		Cursor:             cursor,
		ClubIds:            []string{obj.ID.GetID()},
		Principal:          principal.FromContext(ctx),
		AudienceSlugs:      audienceSlugs,
		CategorySlugs:      categorySlugs,
		CharacterSlugs:     characterSlugs,
		SeriesSlugs:        seriesSlugs,
		State:              stateModified,
		SortBy:             strings.ToLower(sortBy.String()),
		ShowSuspendedClubs: true,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}
