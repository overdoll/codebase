package activities

import (
	"context"
)

type RemoveAccountClubSupportSubscription struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
}

func (h *Activities) RemoveAccountClubSupportSubscription(ctx context.Context, payload RemoveAccountClubSupportSubscription) error {
	return nil
}
