package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type IndexAllCharactersHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewIndexAllCharactersHandler(pr post.Repository, pi post.IndexRepository) IndexAllCharactersHandler {
	return IndexAllCharactersHandler{pr: pr, pi: pi}
}

func (h IndexAllCharactersHandler) Handle(ctx context.Context) error {

	if err := h.pi.DeleteCharacterIndex(ctx); err != nil {
		return err
	}

	characters, err := h.pr.GetCharacters(ctx)

	if err != nil {
		return err
	}

	return h.pi.BulkIndexCharacters(ctx, characters)
}
