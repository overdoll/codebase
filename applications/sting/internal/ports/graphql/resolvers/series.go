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

type SeriesResolver struct {
	App *app.Application
}

func (r SeriesResolver) Title(ctx context.Context, obj *types.Series, locale *string) (string, error) {
	return graphql.GetTranslationFromTranslationsAndLanguage(obj.TitleTranslations, locale)
}

func (r SeriesResolver) Posts(ctx context.Context, obj *types.Series, after *string, before *string, first *int, last *int, audienceSlugs []string, categorySlugs []string, characterSlugs []string, state *types.PostState, supporterOnlyStatus []types.SupporterOnlyStatus, seed *string, sortBy types.PostsSort) (*types.PostConnection, error) {

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
		SeriesSlugs:         []string{obj.Slug},
		AudienceSlugs:       audienceSlugs,
		CategorySlugs:       categorySlugs,
		CharacterSlugs:      characterSlugs,
		SupporterOnlyStatus: supporterOnly,
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

func (r SeriesResolver) Characters(ctx context.Context, obj *types.Series, after *string, before *string, first *int, last *int, slugs []string, name *string, sortBy types.CharactersSort) (*types.CharacterConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	seriesId := obj.ID.GetID()

	results, err := r.App.Queries.SearchCharacters.Handle(ctx, query.SearchCharacters{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
		Slugs:     slugs,
		SortBy:    sortBy.String(),
		Name:      name,
		SeriesId:  &seriesId,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalCharacterToGraphQLConnection(ctx, results, cursor), nil
}
