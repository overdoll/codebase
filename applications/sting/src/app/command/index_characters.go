package command

import (
	"context"

	"overdoll/applications/sting/src/domain/character"
)

type IndexCharactersHandler struct {
	cr  character.Repository
	cir character.IndexRepository
}

func NewIndexCharactersHandler(cr character.Repository, cir character.IndexRepository) IndexCharactersHandler {
	return IndexCharactersHandler{cr: cr, cir: cir}
}

func (h IndexCharactersHandler) Handle(ctx context.Context) error {

	err := h.cir.DeleteIndexCharacters(ctx)

	if err != nil {

	}

	characters, err := h.cr.GetCharacters(ctx)

	if err != nil {

	}

	err = h.cir.BulkIndexCharacters(ctx, characters)

	if err != nil {

	}

	return nil
}
