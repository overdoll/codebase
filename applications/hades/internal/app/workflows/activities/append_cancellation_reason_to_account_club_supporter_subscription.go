package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type AppendCancellationReasonToAccountClubSupporterSubscriptionInput struct {
	AccountClubSupporterSubscriptionId string
	CancellationReasonId               string
}

func (h *Activities) AppendCancellationReasonToAccountClubSupporterSubscription(ctx context.Context, input AppendCancellationReasonToAccountClubSupporterSubscriptionInput) error {

	_, err := h.billing.UpdateAccountClubSupporterCancelOperator(ctx, input.AccountClubSupporterSubscriptionId, func(subscription *billing.AccountClubSupporterSubscription) error {

		cancellationReason, err := h.cr.GetReasonById(ctx, input.CancellationReasonId)

		if err != nil {
			return err
		}

		return subscription.Cancel(cancellationReason)
	})

	if err != nil {
		return err
	}

	return nil
}
