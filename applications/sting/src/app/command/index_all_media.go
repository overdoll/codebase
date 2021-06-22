package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type IndexAllMediaHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewIndexAllMediaHandler(pr post.Repository, pi post.IndexRepository) IndexAllMediaHandler {
	return IndexAllMediaHandler{pr: pr, pi: pi}
}

func (h IndexAllMediaHandler) Handle(ctx context.Context) error {

	if err := h.pi.DeleteMediaIndex(ctx); err != nil {
		return err
	}

	medias, err := h.pr.GetMedias(ctx)

	if err != nil {
		return err
	}

	return h.pi.BulkIndexMedia(ctx, medias)
}
