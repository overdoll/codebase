package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/money"
	"time"
)

type NewClubSupporterSubscriptionPaymentDeductionInput struct {
	AccountId            string
	ClubId               string
	AccountTransactionId string

	Amount    uint64
	Currency  money.Currency
	Timestamp time.Time
}

func (h *Activities) NewClubSupporterSubscriptionPaymentDeduction(ctx context.Context, input NewClubSupporterSubscriptionPaymentDeductionInput) error {
	return h.ringer.NewClubSupporterSubscriptionPaymentDeduction(
		ctx,
		input.AccountId,
		input.ClubId,
		input.AccountTransactionId,
		input.Timestamp,
		billing.UnmarshalPricingFromDatabase(input.Currency, input.Amount),
	)
}
