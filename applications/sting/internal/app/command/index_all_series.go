package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type IndexAllSeriesHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewIndexAllSeriesHandler(pr post.Repository, pi post.IndexRepository) IndexAllSeriesHandler {
	return IndexAllSeriesHandler{pr: pr, pi: pi}
}

func (h IndexAllSeriesHandler) Handle(ctx context.Context) error {

	if err := h.pi.DeleteSeriesIndex(ctx); err != nil {
		return err
	}

	return h.pi.IndexAllSeries(ctx)
}
