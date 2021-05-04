package query

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type SearchCharactersHandler struct {
	pr post.IndexRepository
}

func NewSearchCharactersHandler(pr post.IndexRepository) SearchCharactersHandler {
	return SearchCharactersHandler{pr: pr}
}

func (h SearchCharactersHandler) Handle(ctx context.Context, query string) ([]*post.Character, error) {
	return h.pr.SearchCharacters(ctx, query)
}
