package activities

import (
	"context"
	"time"
)

type ClubSupporterRequiredPostReminderInput struct {
	ClubId         string
	DurationPassed time.Duration
}

func (h *Activities) ClubSupporterRequiredPostReminder(ctx context.Context, input ClubSupporterRequiredPostReminderInput) error {

	clb, err := h.cr.GetClubById(ctx, input.ClubId)

	if err != nil {
		return err
	}

	if clb.NextSupporterPostTime() == nil {
		return nil
	}

	return h.carrier.ClubSupporterRequiredPostReminder(ctx, input.ClubId, input.DurationPassed)
}
