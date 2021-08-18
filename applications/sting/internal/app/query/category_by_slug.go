package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type CategoryBySlug struct {
	Principal *principal.Principal
	Slug      string
}

type CategoryBySlugHandler struct {
	pi post.IndexRepository
}

func NewCategoryBySlugHandler(pi post.IndexRepository) CategoryBySlugHandler {
	return CategoryBySlugHandler{pi: pi}
}

func (h CategoryBySlugHandler) Handle(ctx context.Context, query CategoryBySlug) (*post.Category, error) {

	result, err := h.pi.GetCategoryBySlug(ctx, query.Principal, query.Slug)

	if err != nil {
		return nil, err
	}

	return result, nil
}
