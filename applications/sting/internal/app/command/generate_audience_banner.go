package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
	"time"
)

type GenerateAudienceBanner struct {
	Principal *principal.Principal

	AudienceId string
	Duration   int64
}

type GenerateAudienceBannerHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewGenerateAudienceBannerHandler(pr post.Repository, event event.Repository) GenerateAudienceBannerHandler {
	return GenerateAudienceBannerHandler{pr: pr, event: event}
}

func (h GenerateAudienceBannerHandler) Handle(ctx context.Context, cmd GenerateAudienceBanner) (*post.Audience, error) {

	audience, err := h.pr.GetAudienceById(ctx, cmd.AudienceId)

	if err != nil {
		return nil, err
	}

	if err := h.event.GenerateAudienceBanner(ctx, cmd.Principal, audience, time.Duration(cmd.Duration)); err != nil {
		return nil, err
	}

	return audience, nil
}
