package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/graphql/relay"
)

type SearchCategoriesHandler struct {
	pr post.IndexRepository
}

func NewSearchCategoriesHandler(pr post.IndexRepository) SearchCategoriesHandler {
	return SearchCategoriesHandler{pr: pr}
}

func (h SearchCategoriesHandler) Handle(ctx context.Context, cursor *relay.Cursor, query string) ([]*post.Category, *relay.Paging, error) {

	cats, err := h.pr.SearchCategories(ctx, query)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, ErrSearchFailed
	}

	return cats, nil
}
