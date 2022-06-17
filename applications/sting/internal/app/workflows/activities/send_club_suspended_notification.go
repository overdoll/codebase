package activities

import (
	"context"
	"time"
)

type SendClubSuspendedNotificationInput struct {
	ClubId  string
	EndTime time.Time
}

func (h *Activities) SendClubSuspendedNotification(ctx context.Context, input SendClubSuspendedNotificationInput) error {
	return h.carrier.ClubSuspended(ctx, input.ClubId, input.EndTime)
}
