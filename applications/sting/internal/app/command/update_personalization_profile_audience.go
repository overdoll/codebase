package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/personalization"

	"overdoll/libraries/principal"
)

type UpdatePersonalizationProfileAudience struct {
	Principal   *principal.Principal
	AudienceIds []string
	Skipped     bool
}

type UpdatePersonalizationProfileAudienceHandler struct {
	pr personalization.Repository
}

func NewUpdatePersonalizationProfileAudience(pr personalization.Repository) UpdatePersonalizationProfileAudienceHandler {
	return UpdatePersonalizationProfileAudienceHandler{pr: pr}
}

func (h UpdatePersonalizationProfileAudienceHandler) Handle(ctx context.Context, cmd UpdatePersonalizationProfileAudience) (*personalization.Profile, error) {

	result, err := h.pr.UpdateProfileAudience(ctx, cmd.Principal, cmd.Principal.AccountId(), func(profile *personalization.Profile) error {
		return profile.UpdateAudience(cmd.AudienceIds, cmd.Skipped)
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}
