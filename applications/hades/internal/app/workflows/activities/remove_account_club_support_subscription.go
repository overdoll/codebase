package activities

import (
	"context"
)

type RemoveAccountClubSupportSubscription struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
}

func (h *Activities) RemoveAccountClubSupportSubscription(ctx context.Context, request RemoveAccountClubSupportSubscription) error {
	return h.billing.DeleteAccountClubSupporterSubscriptionOperator(ctx, request.AccountId, request.ClubId, request.CCBillSubscriptionId)
}
