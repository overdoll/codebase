package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type AudienceById struct {
	AudienceId string
}

type AudienceByIdHandler struct {
	pr post.Repository
}

func NewAudienceByIdHandler(pr post.Repository) AudienceByIdHandler {
	return AudienceByIdHandler{pr: pr}
}

func (h AudienceByIdHandler) Handle(ctx context.Context, query AudienceById) (*post.Audience, error) {

	result, err := h.pr.GetAudienceById(ctx, query.AudienceId)

	if err != nil {
		return nil, err
	}

	return result, nil
}
