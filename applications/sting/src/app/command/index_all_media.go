package command

import (
	"context"

	"overdoll/applications/sting/src/domain/character"
)

type IndexAllMediaHandler struct {
	cr  character.Repository
	cir character.IndexRepository
}

func NewIndexAllMediaHandler(cr character.Repository, cir character.IndexRepository) IndexAllMediaHandler {
	return IndexAllMediaHandler{cr: cr, cir: cir}
}

func (h IndexAllMediaHandler) Handle(ctx context.Context) error {
	err := h.cir.DeleteIndexMedia(ctx)

	if err != nil {

	}

	medias, err := h.cr.GetMedias(ctx)

	if err != nil {

	}

	err = h.cir.BulkIndexMedia(ctx, medias)

	if err != nil {

	}

	return nil
}
