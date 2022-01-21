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
	pi post.IndexRepository
}

func NewUpdateAudienceIsStandardHandler(pr post.Repository, pi post.IndexRepository) UpdateAudienceIsStandardHandler {
	return UpdateAudienceIsStandardHandler{pr: pr, pi: pi}
}

func (h UpdateAudienceIsStandardHandler) Handle(ctx context.Context, cmd UpdateAudienceIsStandard) (*post.Audience, error) {

	aud, err := h.pr.UpdateAudienceTitle(ctx, cmd.Principal, cmd.AudienceId, func(audience *post.Audience) error {
		return audience.UpdateIsStandard(cmd.Principal, cmd.IsStandard)
	})

	if err != nil {
		return nil, err
	}

	if err := h.pi.IndexAudience(ctx, aud); err != nil {
		return nil, err
	}

	return aud, nil
}
