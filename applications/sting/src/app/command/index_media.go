package command

import (
	"context"

	"overdoll/applications/sting/src/domain/character"
)

type IndexMediaHandler struct {
	cr  character.Repository
	cir character.IndexRepository
}

func NewIndexMediaHandler(cr character.Repository, cir character.IndexRepository) IndexMediaHandler {
	return IndexMediaHandler{cr: cr, cir: cir}
}

func (h IndexMediaHandler) Handle(ctx context.Context) error {
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
