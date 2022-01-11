package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchAudience struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	Title     *string
	Slugs     []string
	SortBy    string
}

type SearchAudienceHandler struct {
	pr post.IndexRepository
}

func NewSearchAudienceHandler(pr post.IndexRepository) SearchAudienceHandler {
	return SearchAudienceHandler{pr: pr}
}

func (h SearchAudienceHandler) Handle(ctx context.Context, query SearchAudience) ([]*post.Audience, error) {

	filters, err := post.NewObjectFilters(
		query.Title,
		query.SortBy,
		query.Slugs,
	)

	if err != nil {
		return nil, err
	}

	results, err := h.pr.SearchAudience(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return results, nil
}
