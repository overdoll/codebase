package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type UpdateAccountClubSupportBillingDate struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
	NextBillingDate      string
}

func (h *Activities) UpdateAccountClubSupportBillingDate(ctx context.Context, request UpdateAccountClubSupportBillingDate) error {

	nextBillingDate, err := ccbill.ParseCCBillDateWithTime(request.NextBillingDate)

	if err != nil {
		return err
	}

	_, err = h.billing.UpdateAccountClubSupportBillingDate(ctx, request.AccountId, request.ClubId, request.CCBillSubscriptionId, func(subscription *billing.AccountClubSupportSubscription) error {
		return subscription.UpdateBillingDate(nextBillingDate)
	})

	if err != nil {
		return err
	}

	return nil
}
