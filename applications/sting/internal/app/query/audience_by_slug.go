package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type AudienceBySlug struct {
	Principal *principal.Principal
	Slug      string
}

type AudienceBySlugHandler struct {
	pi post.IndexRepository
}

func NewAudienceBySlugHandler(pi post.IndexRepository) AudienceBySlugHandler {
	return AudienceBySlugHandler{pi: pi}
}

func (h AudienceBySlugHandler) Handle(ctx context.Context, query AudienceBySlug) (*post.Audience, error) {

	result, err := h.pi.GetAudienceBySlug(ctx, query.Principal, query.Slug)

	if err != nil {
		return nil, err
	}

	return result, nil
}
