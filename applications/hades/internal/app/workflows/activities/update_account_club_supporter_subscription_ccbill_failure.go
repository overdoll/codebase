package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type UpdateAccountClubSupporterSubscriptionCCBillFailureInput struct {
	AccountClubSupporterSubscriptionId string
	Timestamp                          time.Time
	CCBillErrorText                    string
	CCBillErrorCode                    string
	NextRetryDate                      time.Time
}

func (h *Activities) UpdateAccountClubSupporterSubscriptionCCBillFailure(ctx context.Context, input UpdateAccountClubSupporterSubscriptionCCBillFailureInput) error {

	_, err := h.billing.UpdateAccountClubSupporterSubscriptionStatusOperator(ctx, input.AccountClubSupporterSubscriptionId, func(subscription *billing.AccountClubSupporterSubscription) error {
		return subscription.UpdateCCBillPaymentError(input.Timestamp, input.CCBillErrorText, input.CCBillErrorCode, input.NextRetryDate)
	})

	if err != nil {
		return err
	}

	return nil
}
