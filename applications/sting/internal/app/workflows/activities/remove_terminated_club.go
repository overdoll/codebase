package activities

import (
	"context"
)

type RemoveTerminatedClubInput struct {
	ClubId string
}

func (h *Activities) RemoveTerminatedClub(ctx context.Context, input RemoveTerminatedClubInput) error {

	// TODO: remove terminated club

	return nil
}
