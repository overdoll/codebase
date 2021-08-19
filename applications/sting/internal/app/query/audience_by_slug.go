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
	pr post.Repository
}

func NewAudienceBySlugHandler(pr post.Repository) AudienceBySlugHandler {
	return AudienceBySlugHandler{pr: pr}
}

func (h AudienceBySlugHandler) Handle(ctx context.Context, query AudienceBySlug) (*post.Audience, error) {

	result, err := h.pr.GetAudienceBySlug(ctx, query.Principal, query.Slug)

	if err != nil {
		return nil, err
	}

	return result, nil
}
