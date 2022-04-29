package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type UpdateAudienceIsStandard struct {
	Principal  *principal.Principal
	AudienceId string
	IsStandard bool
}

type UpdateAudienceIsStandardHandler struct {
	pr post.Repository
}

func NewUpdateAudienceIsStandardHandler(pr post.Repository) UpdateAudienceIsStandardHandler {
	return UpdateAudienceIsStandardHandler{pr: pr}
}

func (h UpdateAudienceIsStandardHandler) Handle(ctx context.Context, cmd UpdateAudienceIsStandard) (*post.Audience, error) {

	aud, err := h.pr.UpdateAudienceIsStandard(ctx, cmd.Principal, cmd.AudienceId, func(audience *post.Audience) error {
		return audience.UpdateIsStandard(cmd.Principal, cmd.IsStandard)
	})

	if err != nil {
		return nil, err
	}

	return aud, nil
}
