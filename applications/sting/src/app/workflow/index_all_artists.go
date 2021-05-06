package workflow

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/post"
)

type IndexAllArtistsHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewIndexAllArtistsHandler(pr post.Repository, pi post.IndexRepository) IndexAllArtistsHandler {
	return IndexAllArtistsHandler{pr: pr, pi: pi}
}

func (h IndexAllArtistsHandler) HandlerName() string {
	return "IndexAllArtistsHandler"
}

func (h IndexAllArtistsHandler) NewCommand() interface{} {
	return &sting.IndexAllArtists{}
}

func (h IndexAllArtistsHandler) Handle(ctx context.Context, c interface{}) error {

	err := h.pi.DeleteArtistIndex(ctx)

	if err != nil {

	}

	artists, err := h.pr.GetArtists(ctx)

	if err != nil {

	}

	err = h.pi.BulkIndexArtists(ctx, artists)

	if err != nil {

	}

	return nil
}
