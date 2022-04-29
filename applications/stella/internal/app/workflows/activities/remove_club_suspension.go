package activities

import (
	"context"
)

type RemoveClubSuspensionInput struct {
	ClubId string
}

func (h *Activities) RemoveClubSuspension(ctx context.Context, input AddClubSuspensionInput) error {

	if err := h.sting.RemoveSuspendedClub(ctx, input.ClubId); err != nil {
		return err
	}

	return nil
}
