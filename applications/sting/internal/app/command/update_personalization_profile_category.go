package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/personalization"

	"overdoll/libraries/principal"
)

type UpdatePersonalizationProfileCategory struct {
	Principal   *principal.Principal
	CategoryIds []string
	Skipped     bool
}

type UpdatePersonalizationProfileCategoryHandler struct {
	pr personalization.Repository
}

func NewUpdatePersonalizationProfileCategoryHandler(pr personalization.Repository) UpdatePersonalizationProfileCategoryHandler {
	return UpdatePersonalizationProfileCategoryHandler{pr: pr}
}

func (h UpdatePersonalizationProfileCategoryHandler) Handle(ctx context.Context, cmd UpdatePersonalizationProfileCategory) (*personalization.Profile, error) {

	result, err := h.pr.UpdateProfileCategory(ctx, cmd.Principal, cmd.Principal.AccountId(), func(profile *personalization.Profile) error {
		return profile.UpdateCategory(cmd.CategoryIds, cmd.Skipped)
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}
