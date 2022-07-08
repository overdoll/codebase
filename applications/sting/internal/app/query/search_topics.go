package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchTopics struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
}

type SearchTopicsHandler struct {
	pr post.Repository
}

func NewSearchTopicsHandler(pr post.Repository) SearchTopicsHandler {
	return SearchTopicsHandler{pr: pr}
}

func (h SearchTopicsHandler) Handle(ctx context.Context, query SearchTopics) ([]*post.Topic, error) {

	results, err := h.pr.SearchTopics(ctx, query.Principal, query.Cursor)

	if err != nil {
		return nil, err
	}

	return results, nil
}
