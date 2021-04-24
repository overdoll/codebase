package command

import (
	"context"

	"overdoll/applications/sting/src/domain/artist"
)

type IndexAllArtistsHandler struct {
	ar  artist.Repository
	air artist.IndexRepository
}

func NewIndexAllArtistsHandler(ar artist.Repository, air artist.IndexRepository) IndexAllArtistsHandler {
	return IndexAllArtistsHandler{ar: ar, air: air}
}

func (h IndexAllArtistsHandler) Handle(ctx context.Context) error {

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
