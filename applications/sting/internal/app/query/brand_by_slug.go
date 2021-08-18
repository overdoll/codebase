package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type BrandBySlug struct {
	Principal *principal.Principal
	Slug      string
}

type BrandBySlugHandler struct {
	pi post.IndexRepository
}

func NewBrandBySlugHandler(pi post.IndexRepository) BrandBySlugHandler {
	return BrandBySlugHandler{pi: pi}
}

func (h BrandBySlugHandler) Handle(ctx context.Context, query BrandBySlug) (*post.Brand, error) {

	result, err := h.pi.GetBrandBySlug(ctx, query.Principal, query.Slug)

	if err != nil {
		return nil, err
	}

	return result, nil
}
