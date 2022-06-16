package activities

import (
	"context"
)

type AddTerminatedClubInput struct {
	ClubId string
}

func (h *Activities) AddTerminatedClub(ctx context.Context, input AddTerminatedClubInput) error {

	if err := h.pr.AddTerminatedClub(ctx, input.ClubId); err != nil {
		return err
	}

	return nil
}
