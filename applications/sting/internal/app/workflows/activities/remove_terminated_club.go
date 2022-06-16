package activities

import (
	"context"
)

type RemoveTerminatedClubInput struct {
	ClubId string
}

func (h *Activities) RemoveTerminatedClub(ctx context.Context, input RemoveTerminatedClubInput) error {

	if err := h.pr.RemoveTerminatedClub(ctx, input.ClubId); err != nil {
		return err
	}

	return nil
}
