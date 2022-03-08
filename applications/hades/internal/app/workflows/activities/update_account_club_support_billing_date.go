package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type UpdateAccountClubSupportBillingDateInput struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
	NextBillingDate      string
}

func (h *Activities) UpdateAccountClubSupportBillingDate(ctx context.Context, input UpdateAccountClubSupportBillingDateInput) error {

	nextBillingDate, err := ccbill.ParseCCBillDate(input.NextBillingDate)

	if err != nil {
		return err
	}

	_, err = h.billing.UpdateAccountClubSupporterBillingDateOperator(ctx, input.AccountId, input.ClubId, input.CCBillSubscriptionId, func(subscription *billing.AccountClubSupporterSubscription) error {
		return subscription.UpdateBillingDate(nextBillingDate)
	})

	if err != nil {
		return err
	}

	return nil
}
