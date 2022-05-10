package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/money"
	"time"
)

type NewClubSupporterSubscriptionPaymentDepositInput struct {
	AccountId            string
	ClubId               string
	AccountTransactionId string

	Amount    uint64
	Currency  money.Currency
	Timestamp time.Time
}

func (h *Activities) NewClubSupporterSubscriptionPaymentDeposit(ctx context.Context, input NewClubSupporterSubscriptionPaymentDepositInput) error {
	return h.ringer.NewClubSupporterSubscriptionPaymentDeposit(
		ctx,
		input.AccountId,
		input.ClubId,
		input.AccountTransactionId,
		input.Timestamp,
		billing.UnmarshalPricingFromDatabase(input.Currency, input.Amount),
	)
}
