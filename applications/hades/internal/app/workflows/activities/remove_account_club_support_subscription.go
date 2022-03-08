package activities

import (
	"context"
)

type RemoveAccountClubSupportSubscriptionInput struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
}

func (h *Activities) RemoveAccountClubSupportSubscription(ctx context.Context, input RemoveAccountClubSupportSubscriptionInput) error {
	return h.billing.DeleteAccountClubSupporterSubscriptionOperator(ctx, input.AccountId, input.ClubId, input.CCBillSubscriptionId)
}
