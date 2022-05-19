package activities

import (
	"context"
	"overdoll/libraries/money"
)

type SendAccountClubSupporterSubscriptionDuplicateNotificationInput struct {
	AccountId string
	ClubId    string
	Amount    uint64
	Currency  money.Currency
}

func (h *Activities) SendAccountClubSupporterSubscriptionDuplicateNotification(ctx context.Context, input SendAccountClubSupporterSubscriptionDuplicateNotificationInput) error {

	if err := h.carrier.ClubSupporterSubscriptionDuplicate(ctx, input.AccountId, input.ClubId, input.Amount, input.Currency); err != nil {
		return err
	}

	return nil
}
