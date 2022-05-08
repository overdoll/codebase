package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type UpdateAudienceTitle struct {
	Principal  *principal.Principal
	AudienceId string
	Title      string
	Locale     string
}

type UpdateAudienceTitleHandler struct {
	pr post.Repository
}

func NewUpdateAudienceTitleHandler(pr post.Repository) UpdateAudienceTitleHandler {
	return UpdateAudienceTitleHandler{pr: pr}
}

func (h UpdateAudienceTitleHandler) Handle(ctx context.Context, cmd UpdateAudienceTitle) (*post.Audience, error) {

	aud, err := h.pr.UpdateAudienceTitle(ctx, cmd.Principal, cmd.AudienceId, func(audience *post.Audience) error {
		return audience.UpdateTitle(cmd.Principal, cmd.Title, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return aud, nil
}
