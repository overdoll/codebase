package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/curation"

	"overdoll/libraries/principal"
)

type UpdateCurationProfileAudience struct {
	Principal   *principal.Principal
	AudienceIds []string
	Skipped     bool
}

type UpdateCurationProfileAudienceHandler struct {
	pr curation.Repository
}

func NewUpdateCurationProfileAudience(pr curation.Repository) UpdateCurationProfileAudienceHandler {
	return UpdateCurationProfileAudienceHandler{pr: pr}
}

func (h UpdateCurationProfileAudienceHandler) Handle(ctx context.Context, cmd UpdateCurationProfileAudience) (*curation.Profile, error) {

	result, err := h.pr.UpdateProfileAudience(ctx, cmd.Principal, cmd.Principal.AccountId(), func(profile *curation.Profile) error {
		return profile.UpdateAudience(cmd.AudienceIds, cmd.Skipped)
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}
