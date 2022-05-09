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
	return h.carrier.ClubSupporterRequiredPostReminder(ctx, input.ClubId, input.DurationPassed)
}
