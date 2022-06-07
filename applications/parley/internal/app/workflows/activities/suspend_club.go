package activities

import (
	"context"
)

type SuspendClubInput struct {
	ClubId            string
	Duration          int64
	IsPostRemoval     bool
	IsModerationQueue bool
}

func (h *Activities) SuspendClub(ctx context.Context, input SuspendClubInput) error {

	if err := h.stella.SuspendClub(ctx, input.ClubId, input.Duration, input.IsModerationQueue, input.IsPostRemoval); err != nil {
		return err
	}

	return nil
}
