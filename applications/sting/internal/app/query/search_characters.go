package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
)

type SearchCharacters struct {
	Cursor *paging.Cursor
	Name   *string
}

type SearchCharactersHandler struct {
	pr post.IndexRepository
}

func NewSearchCharactersHandler(pr post.IndexRepository) SearchCharactersHandler {
	return SearchCharactersHandler{pr: pr}
}

func (h SearchCharactersHandler) Handle(ctx context.Context, query SearchCharacters) ([]*post.Character, error) {

	results, err := h.pr.SearchCharacters(ctx, query.Cursor, query.Name)

	if err != nil {
		return nil, err
	}

	return results, nil
}
