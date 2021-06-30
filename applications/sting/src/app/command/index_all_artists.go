package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type IndexAllArtistsHandler struct {
	pr  post.Repository
	pi  post.IndexRepository
	eva EvaService
}

func NewIndexAllArtistsHandler(pr post.Repository, pi post.IndexRepository, eva EvaService) IndexAllArtistsHandler {
	return IndexAllArtistsHandler{pr: pr, pi: pi, eva: eva}
}

func (h IndexAllArtistsHandler) Handle(ctx context.Context) error {

	if err := h.pi.DeleteArtistIndex(ctx); err != nil {
		return err
	}

	artists, err := h.pr.GetArtists(ctx)

	if err != nil {
		return err
	}

	for _, _ = range artists {
		// TODO: grab each artist from eva to get details
	}

	return h.pi.BulkIndexArtists(ctx, artists)
}
