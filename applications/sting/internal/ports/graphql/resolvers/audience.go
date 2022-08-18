package resolvers

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type AudienceResolver struct {
	App *app.Application
}

func (r AudienceResolver) Title(ctx context.Context, obj *types.Audience, locale *string) (string, error) {
	return graphql.GetTranslationFromTranslationsAndLanguage(obj.TitleTranslations, locale)
}

func (r AudienceResolver) Posts(ctx context.Context, obj *types.Audience, after *string, before *string, first *int, last *int, categorySlugs []string, characterSlugs []string, seriesSlugs []string, state *types.PostState, supporterOnlyStatus []types.SupporterOnlyStatus, seed *string, sortBy types.PostsSort) (*types.PostConnection, error) {

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
		Cursor:              cursor,
		AudienceSlugs:       []string{obj.Slug},
		CategorySlugs:       categorySlugs,
		SupporterOnlyStatus: supporterOnly,
		CharacterSlugs:      characterSlugs,
		SeriesSlugs:         seriesSlugs,
		Principal:           principal.FromContext(ctx),
		State:               stateModified,
		SortBy:              sortBy.String(),
		ShowSuspendedClubs:  false,
		Seed:                seed,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(ctx, results, cursor), nil
}
