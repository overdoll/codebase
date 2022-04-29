package activities

import (
	"context"
)

type AddClubSuspensionInput struct {
	ClubId string
}

func (h *Activities) AddClubSuspension(ctx context.Context, input AddClubSuspensionInput) error {

	if err := h.sting.AddSuspendedClub(ctx, input.ClubId); err != nil {
		return err
	}

	return nil
}
