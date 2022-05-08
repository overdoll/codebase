package activities

import (
	"context"
)

type SendClubOverChargebackThresholdNotificationInput struct {
	ClubId    string
	Threshold float64
}

func (h *Activities) SendClubOverChargebackThresholdNotification(ctx context.Context, input SendClubOverChargebackThresholdNotificationInput) error {
	return h.carrier.ClubOverChargebackThreshold(ctx, input.ClubId, input.Threshold)
}
