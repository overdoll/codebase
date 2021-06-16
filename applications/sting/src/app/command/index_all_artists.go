package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type IndexAllArtistsHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewIndexAllArtistsHandler(pr post.Repository, pi post.IndexRepository) IndexAllArtistsHandler {
	return IndexAllArtistsHandler{pr: pr, pi: pi}
}

func (h IndexAllArtistsHandler) Handle(ctx context.Context) error {

	if err := h.pi.DeleteArtistIndex(ctx); err != nil {
		return err
	}

	artists, err := h.pr.GetArtists(ctx)

	if err != nil {
		return err
	}

	return h.pi.BulkIndexArtists(ctx, artists)
}
