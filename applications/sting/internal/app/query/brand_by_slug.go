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
	pr post.Repository
}

func NewBrandBySlugHandler(pr post.Repository) BrandBySlugHandler {
	return BrandBySlugHandler{pr: pr}
}

func (h BrandBySlugHandler) Handle(ctx context.Context, query BrandBySlug) (*post.Brand, error) {

	result, err := h.pr.GetBrandBySlug(ctx, query.Principal, query.Slug)

	if err != nil {
		return nil, err
	}

	return result, nil
}
