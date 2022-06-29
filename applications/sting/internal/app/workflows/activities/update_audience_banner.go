package activities

import (
	"context"
)

type UpdateAudienceBannerInput struct {
	AudienceId string
}

func (h *Activities) UpdateAudienceBanner(ctx context.Context, input UpdateAudienceBannerInput) error {
	return nil
}
