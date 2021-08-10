package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type IndexAllBrandsHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewIndexAllBrandsHandler(pr post.Repository, pi post.IndexRepository) IndexAllBrandsHandler {
	return IndexAllBrandsHandler{pr: pr, pi: pi}
}

func (h IndexAllBrandsHandler) Handle(ctx context.Context) error {

	if err := h.pi.DeleteBrandsIndex(ctx); err != nil {
		return err
	}

	return h.pi.IndexAllBrands(ctx)
}
