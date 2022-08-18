package queries

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

func (r *QueryResolver) Characters(ctx context.Context, after *string, before *string, first *int, last *int, clubCharacters *bool, slugs []string, seriesSlug, clubSlug, name *string, excludeEmpty bool, sortBy types.CharactersSort) (*types.CharacterConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.SearchCharacters.Handle(ctx, query.SearchCharacters{
		Principal:      principal.FromContext(ctx),
		Cursor:         cursor,
		Slugs:          slugs,
		SortBy:         sortBy.String(),
		Name:           name,
		SeriesSlug:     seriesSlug,
		ClubId:         clubSlug,
		ClubCharacters: clubCharacters,
		ExcludeEmpty:   excludeEmpty,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalCharacterToGraphQLConnection(ctx, results, cursor), nil
}

func (r *QueryResolver) Character(ctx context.Context, slug string, seriesSlug *string, clubSlug *string) (*types.Character, error) {

	character, err := r.App.Queries.CharacterBySlug.Handle(ctx, query.CharacterBySlug{
		Principal:  principal.FromContext(ctx),
		Slug:       slug,
		SeriesSlug: seriesSlug,
		ClubSlug:   clubSlug,
	})

	if err != nil {

		if apperror.IsNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalCharacterToGraphQL(ctx, character), nil
}
