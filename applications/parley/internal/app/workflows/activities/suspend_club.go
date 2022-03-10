package activities

import (
	"context"
	"github.com/pkg/errors"
)

type SuspendClubInput struct {
	ClubId   string
	Duration int64
}

func (h *Activities) SuspendClub(ctx context.Context, input SuspendClubInput) error {

	// post approved
	if err := h.stella.SuspendClub(ctx, input.ClubId, input.Duration); err != nil {
		return errors.Wrap(err, "failed to suspend club")
	}

	return nil
}
