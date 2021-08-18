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
	pi post.IndexRepository
}

func NewSeriesBySlugHandler(pi post.IndexRepository) SeriesBySlugHandler {
	return SeriesBySlugHandler{pi: pi}
}

func (h SeriesBySlugHandler) Handle(ctx context.Context, query SeriesBySlug) (*post.Series, error) {

	result, err := h.pi.GetSeriesBySlug(ctx, query.Principal, query.Slug)

	if err != nil {
		return nil, err
	}

	return result, nil
}
