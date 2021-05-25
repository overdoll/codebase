package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

type SearchCharactersHandler struct {
	pr post.IndexRepository
}

func NewSearchCharactersHandler(pr post.IndexRepository) SearchCharactersHandler {
	return SearchCharactersHandler{pr: pr}
}

func (h SearchCharactersHandler) Handle(ctx context.Context, query string) ([]*post.Character, error) {

	chars, err := h.pr.SearchCharacters(ctx, query)

	if err != nil {
		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, ErrSearchFailed
	}

	return chars, nil
}
