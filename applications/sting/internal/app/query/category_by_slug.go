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
	pr post.Repository
}

func NewCategoryBySlugHandler(pr post.Repository) CategoryBySlugHandler {
	return CategoryBySlugHandler{pr: pr}
}

func (h CategoryBySlugHandler) Handle(ctx context.Context, query CategoryBySlug) (*post.Category, error) {

	result, err := h.pr.GetCategoryBySlug(ctx, query.Principal, query.Slug)

	if err != nil {
		return nil, err
	}

	return result, nil
}
