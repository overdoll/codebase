package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type MarkAccountClubSupportReactivatedInput struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
	NextBillingDate      string
}

func (h *Activities) MarkAccountClubSupportReactivated(ctx context.Context, input MarkAccountClubSupportReactivatedInput) error {

	nextBillingDate, err := ccbill.ParseCCBillDate(input.NextBillingDate)

	if err != nil {
		return err
	}

	_, err = h.billing.UpdateAccountClubSupporterSubscriptionStatusOperator(ctx, input.AccountId, input.ClubId, input.CCBillSubscriptionId, func(subscription *billing.AccountClubSupporterSubscription) error {
		return subscription.MakeReactivated(nextBillingDate)
	})

	if err != nil {
		return err
	}

	return nil
}
