package queries

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

func (r *QueryResolver) Characters(ctx context.Context, after *string, before *string, first *int, last *int, slugs []string, seriesSlug, name *string, orderBy types.CharactersOrder) (*types.CharacterConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.SearchCharacters.Handle(ctx, query.SearchCharacters{
		Principal:  principal.FromContext(ctx),
		Cursor:     cursor,
		Slugs:      slugs,
		OrderBy:    orderBy.Field.String(),
		Name:       name,
		SeriesSlug: seriesSlug,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalCharacterToGraphQLConnection(results, cursor), nil
}

func (r *QueryResolver) Character(ctx context.Context, slug string, seriesSlug string) (*types.Character, error) {

	character, err := r.App.Queries.CharacterBySlug.Handle(ctx, query.CharacterBySlug{
		Principal:  principal.FromContext(ctx),
		Slug:       slug,
		SeriesSlug: seriesSlug,
	})

	if err != nil {

		if err == post.ErrCharacterNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalCharacterToGraphQL(character), nil
}
