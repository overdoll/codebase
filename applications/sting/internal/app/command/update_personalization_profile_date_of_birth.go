package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/personalization"
	"time"

	"overdoll/libraries/principal"
)

type UpdatePersonalizationDateOfBirth struct {
	Principal   *principal.Principal
	DateOfBirth *time.Time
	Skipped     bool
}

type UpdatePersonalizationDateOfBirthHandler struct {
	pr personalization.Repository
}

func NewUpdatePersonalizationDateOfBirthHandler(pr personalization.Repository) UpdatePersonalizationDateOfBirthHandler {
	return UpdatePersonalizationDateOfBirthHandler{pr: pr}
}

func (h UpdatePersonalizationDateOfBirthHandler) Handle(ctx context.Context, cmd UpdatePersonalizationDateOfBirth) (*personalization.Profile, error) {

	result, err := h.pr.UpdateProfileDateOfBirth(ctx, cmd.Principal, cmd.Principal.AccountId(), func(profile *personalization.Profile) error {
		return profile.UpdateDateOfBirth(cmd.DateOfBirth, cmd.Skipped)
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}
