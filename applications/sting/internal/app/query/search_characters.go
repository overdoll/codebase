package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

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
	ClubSlug       *string
	ClubCharacters *bool
	ExcludeEmpty   bool
}

type SearchCharactersHandler struct {
	pr post.Repository
	cr club.Repository
}

func NewSearchCharactersHandler(pr post.Repository, cr club.Repository) SearchCharactersHandler {
	return SearchCharactersHandler{pr: pr, cr: cr}
}

func (h SearchCharactersHandler) Handle(ctx context.Context, query SearchCharacters) ([]*post.Character, error) {

	var clubId *string

	if query.ClubSlug != nil {
		clb, err := h.cr.GetClubById(ctx, *query.ClubSlug)
		if err != nil {
			return nil, err
		}

		clbId := clb.ID()

		clubId = &clbId
	}

	filters, err := post.NewCharacterFilters(
		query.Name,
		query.SortBy,
		query.Slugs,
		query.SeriesSlug,
		clubId,
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
