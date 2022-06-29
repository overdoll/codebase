package activities

import (
	"context"
)

type UpdateCharacterBannerInput struct {
	CharacterId string
}

func (h *Activities) UpdateCharacterBanner(ctx context.Context, input UpdateCharacterBannerInput) error {
	return nil
}
