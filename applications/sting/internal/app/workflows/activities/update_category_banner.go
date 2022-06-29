package activities

import (
	"context"
)

type UpdateCategoryBannerInput struct {
	CategoryId string
}

func (h *Activities) UpdateCategoryBanner(ctx context.Context, input UpdateCategoryBannerInput) error {
	return nil
}
