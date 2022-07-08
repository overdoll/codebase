package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type SeriesBySlug struct {
	Principal *principal.Principal
	Slug      string
}

type SeriesBySlugHandler struct {
	pr post.Repository
}

func NewSeriesBySlugHandler(pr post.Repository) SeriesBySlugHandler {
	return SeriesBySlugHandler{pr: pr}
}

func (h SeriesBySlugHandler) Handle(ctx context.Context, query SeriesBySlug) (*post.Series, error) {

	result, err := h.pr.GetSeriesBySlug(ctx, query.Slug)

	if err != nil {
		return nil, err
	}

	return result, nil
}
