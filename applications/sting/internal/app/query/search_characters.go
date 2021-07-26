package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
)

type SearchCharactersHandler struct {
	pr post.IndexRepository
}

func NewSearchCharactersHandler(pr post.IndexRepository) SearchCharactersHandler {
	return SearchCharactersHandler{pr: pr}
}

func (h SearchCharactersHandler) Handle(ctx context.Context, cursor *paging.Cursor, query string) ([]*post.Character, error) {

	results, err := h.pr.SearchCharacters(ctx, cursor, query)

	if err != nil {
		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, errSearchFailed
	}

	return results, nil
}
