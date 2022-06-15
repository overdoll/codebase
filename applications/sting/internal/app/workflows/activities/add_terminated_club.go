package activities

import (
	"context"
)

type AddTerminatedClubInput struct {
	ClubId string
}

func (h *Activities) AddTerminatedClub(ctx context.Context, input AddTerminatedClubInput) error {

	// TODO: add terminated club

	return nil
}
