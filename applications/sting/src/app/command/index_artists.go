package command

import (
	"context"

	"overdoll/applications/sting/src/domain/artist"
)

type IndexArtistsHandler struct {
	ar  artist.Repository
	air artist.IndexRepository
}

func NewIndexArtistsHandler(ar artist.Repository, air artist.IndexRepository) IndexArtistsHandler {
	return IndexArtistsHandler{ar: ar, air: air}
}

func (h IndexArtistsHandler) Handle(ctx context.Context) error {

	err := h.air.DeleteIndex(ctx)

	if err != nil {

	}

	artists, err := h.ar.GetArtists(ctx)

	if err != nil {

	}

	err = h.air.BulkIndex(ctx, artists)

	if err != nil {

	}

	return nil
}
