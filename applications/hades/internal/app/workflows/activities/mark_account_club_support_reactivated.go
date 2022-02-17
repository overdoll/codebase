package activities

import (
	"context"
)

type MarkAccountClubSupportReactivated struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
	Timestamp            string
	NextBillingDate      string
}

func (h *Activities) MarkAccountClubSupportReactivated(ctx context.Context, payload MarkAccountClubSupportReactivated) error {
	return nil
}
