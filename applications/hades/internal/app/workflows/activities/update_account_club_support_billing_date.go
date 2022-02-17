package activities

import (
	"context"
)

type UpdateAccountClubSupportBillingDate struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
	LastBillingDate      string
	NextBillingDate      string
}

func (h *Activities) UpdateAccountClubSupportBillingDate(ctx context.Context, payload UpdateAccountClubSupportBillingDate) error {
	return nil
}
