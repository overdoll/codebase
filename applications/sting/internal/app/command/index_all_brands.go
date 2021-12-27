package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type IndexAllClubsHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewIndexAllClubsHandler(pr post.Repository, pi post.IndexRepository) IndexAllClubsHandler {
	return IndexAllClubsHandler{pr: pr, pi: pi}
}

func (h IndexAllClubsHandler) Handle(ctx context.Context) error {

	if err := h.pi.DeleteBrandsIndex(ctx); err != nil {
		return err
	}

	return h.pi.IndexAllClubs(ctx)
}
