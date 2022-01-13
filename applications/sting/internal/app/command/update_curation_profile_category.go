package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/curation"

	"overdoll/libraries/principal"
)

type UpdateCurationProfileCategory struct {
	Principal   *principal.Principal
	CategoryIds []string
	Skipped     bool
}

type UpdateCurationProfileCategoryHandler struct {
	pr curation.Repository
}

func NewUpdateCurationProfileCategoryHandler(pr curation.Repository) UpdateCurationProfileCategoryHandler {
	return UpdateCurationProfileCategoryHandler{pr: pr}
}

func (h UpdateCurationProfileCategoryHandler) Handle(ctx context.Context, cmd UpdateCurationProfileCategory) (*curation.Profile, error) {

	result, err := h.pr.UpdateProfileCategory(ctx, cmd.Principal, cmd.Principal.AccountId(), func(profile *curation.Profile) error {
		return profile.UpdateCategory(cmd.CategoryIds, cmd.Skipped)
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}
