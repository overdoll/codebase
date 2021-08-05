package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
)

type SearchAudience struct {
	Cursor *paging.Cursor
	Title  *string
}

type SearchAudienceHandler struct {
	pr post.IndexRepository
}

func NewSearchAudienceHandler(pr post.IndexRepository) SearchAudienceHandler {
	return SearchAudienceHandler{pr: pr}
}

func (h SearchAudienceHandler) Handle(ctx context.Context, query SearchAudience) ([]*post.Audience, error) {

	results, err := h.pr.SearchAudience(ctx, query.Cursor, query.Title)

	if err != nil {
		return nil, err
	}

	return results, nil
}
