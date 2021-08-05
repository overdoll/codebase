package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type IndexAllAudienceHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewIndexAllAudienceHandler(pr post.Repository, pi post.IndexRepository) IndexAllAudienceHandler {
	return IndexAllAudienceHandler{pr: pr, pi: pi}
}

func (h IndexAllAudienceHandler) Handle(ctx context.Context) error {

	if err := h.pi.DeleteAudienceIndex(ctx); err != nil {
		return err
	}

	return h.pi.IndexAllAudience(ctx)
}
