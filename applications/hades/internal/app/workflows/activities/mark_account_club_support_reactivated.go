package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type MarkAccountClubSupportReactivated struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
	NextBillingDate      string
}

func (h *Activities) MarkAccountClubSupportReactivated(ctx context.Context, request MarkAccountClubSupportReactivated) error {

	nextBillingDate, err := ccbill.ParseCCBillDateWithTime(request.NextBillingDate)

	if err != nil {
		return err
	}

	_, err = h.billing.UpdateAccountClubSupportSubscriptionStatus(ctx, request.AccountId, request.ClubId, request.CCBillSubscriptionId, func(subscription *billing.AccountClubSupportSubscription) error {
		return subscription.MakeReactivated(nextBillingDate)
	})

	if err != nil {
		return err
	}

	return nil
}
