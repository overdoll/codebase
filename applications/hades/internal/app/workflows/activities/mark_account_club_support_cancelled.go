package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type MarkAccountClubSupportCancelled struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
	CancelledAt          string
}

func (h *Activities) MarkAccountClubSupportCancelled(ctx context.Context, request MarkAccountClubSupportCancelled) error {

	timestamp, err := ccbill.ParseCCBillDateWithTime(request.CancelledAt)

	if err != nil {
		return err
	}

	_, err = h.billing.UpdateAccountClubSupporterSubscriptionStatusOperator(ctx, request.AccountId, request.ClubId, request.CCBillSubscriptionId, func(subscription *billing.AccountClubSupporterSubscription) error {
		return subscription.MarkCancelled(timestamp)
	})

	if err != nil {
		return err
	}

	return nil
}
