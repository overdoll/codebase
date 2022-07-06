package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type AudiencesByIds struct {
	Principal *principal.Principal
	Ids       []string
}

type AudiencesByIdsHandler struct {
	pr post.Repository
}

func NewAudiencesByIdsHandler(pr post.Repository) AudiencesByIdsHandler {
	return AudiencesByIdsHandler{pr: pr}
}

func (h AudiencesByIdsHandler) Handle(ctx context.Context, query AudiencesByIds) ([]*post.Audience, error) {

	result, err := h.pr.GetAudiencesByIds(ctx, query.Ids)

	if err != nil {
		return nil, err
	}

	return result, nil
}
