package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchCharacters struct {
	Principal      *principal.Principal
	Cursor         *paging.Cursor
	Slugs          []string
	SortBy         string
	Name           *string
	SeriesId       *string
	SeriesSlug     *string
	ClubId         *string
	ClubCharacters *bool
	ExcludeEmpty   bool
}

type SearchCharactersHandler struct {
	pr post.Repository
}

func NewSearchCharactersHandler(pr post.Repository) SearchCharactersHandler {
	return SearchCharactersHandler{pr: pr}
}

func (h SearchCharactersHandler) Handle(ctx context.Context, query SearchCharacters) ([]*post.Character, error) {

	filters, err := post.NewCharacterFilters(
		query.Name,
		query.SortBy,
		query.Slugs,
		query.SeriesSlug,
		query.ClubId,
		query.ClubCharacters,
		query.SeriesId,
		query.ExcludeEmpty,
	)

	if err != nil {
		return nil, err
	}

	results, err := h.pr.SearchCharacters(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return results, nil
}
