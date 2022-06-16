package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
)

type UnTerminateClubInput struct {
	ClubId string
}

func (h *Activities) UnTerminateClub(ctx context.Context, input UnTerminateClubInput) error {

	_, err := h.cr.UpdateClubTerminationStatus(ctx, input.ClubId, func(club *club.Club) error {
		return club.UnTerminate()
	})

	if err != nil {
		return err
	}

	return nil
}
