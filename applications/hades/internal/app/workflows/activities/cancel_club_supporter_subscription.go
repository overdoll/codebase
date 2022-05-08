package activities

import "context"

type CancelClubSupporterSubscriptionInput struct {
	Id string
}

func (h *Activities) CancelClubSupporterSubscription(ctx context.Context, input CancelClubSupporterSubscriptionInput) error {

	active, err := h.billing.GetAccountClubSupporterSubscriptionByIdOperator(ctx, input.Id)

	if err != nil {
		return err
	}

	if err := h.ccbill.CancelSubscription(ctx, *active.CCBillSubscriptionId()); err != nil {
		return err
	}

	return nil
}
