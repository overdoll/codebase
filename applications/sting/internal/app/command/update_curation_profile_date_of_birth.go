package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/curation"
	"time"

	"overdoll/libraries/principal"
)

type UpdateCurationProfileDateOfBirth struct {
	Principal   *principal.Principal
	DateOfBirth *time.Time
	Skipped     bool
}

type UpdateCurationProfileDateOfBirthHandler struct {
	pr curation.Repository
}

func NewUpdateCurationProfileDateOfBirthHandler(pr curation.Repository) UpdateCurationProfileDateOfBirthHandler {
	return UpdateCurationProfileDateOfBirthHandler{pr: pr}
}

func (h UpdateCurationProfileDateOfBirthHandler) Handle(ctx context.Context, cmd UpdateCurationProfileDateOfBirth) (*curation.Profile, error) {

	result, err := h.pr.UpdateProfileDateOfBirth(ctx, cmd.Principal, cmd.Principal.AccountId(), func(profile *curation.Profile) error {
		return profile.UpdateDateOfBirth(cmd.DateOfBirth, cmd.Skipped)
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}
