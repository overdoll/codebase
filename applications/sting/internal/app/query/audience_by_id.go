package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type AudienceById struct {
	Principal *principal.Principal
	Id        string
}

type AudienceByIdHandler struct {
	pr post.Repository
}

func NewAudienceByIdHandler(pr post.Repository) AudienceByIdHandler {
	return AudienceByIdHandler{pr: pr}
}

func (h AudienceByIdHandler) Handle(ctx context.Context, query AudienceById) (*post.Audience, error) {

	result, err := h.pr.GetAudienceById(ctx, query.Principal, query.Id)

	if err != nil {
		return nil, err
	}

	return result, nil
}
