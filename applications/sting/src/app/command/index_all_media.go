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
	err := h.pi.DeleteIndexMedia(ctx)

	if err != nil {

	}

	medias, err := h.pr.GetMedias(ctx)

	if err != nil {

	}

	err = h.pi.BulkIndexMedia(ctx, medias)

	if err != nil {

	}

	return nil
}
