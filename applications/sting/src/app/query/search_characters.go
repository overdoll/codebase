package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/graphql/relay"
)

type SearchCharactersHandler struct {
	pr post.IndexRepository
}

func NewSearchCharactersHandler(pr post.IndexRepository) SearchCharactersHandler {
	return SearchCharactersHandler{pr: pr}
}

func (h SearchCharactersHandler) Handle(ctx context.Context, cursor *relay.Cursor, query string) ([]*post.Character, *relay.Paging, error) {

	results, paging, err := h.pr.SearchCharacters(ctx, cursor, query)

	if err != nil {
		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, nil, ErrSearchFailed
	}

	return results, paging, nil
}
