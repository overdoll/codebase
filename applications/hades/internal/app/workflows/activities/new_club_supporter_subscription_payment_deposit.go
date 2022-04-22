package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/money"
	"time"
)

type NewClubSupporterSubscriptionPaymentDepositInput struct {
	AccountId     string
	ClubId        string
	TransactionId string

	Amount    int64
	Currency  string
	Timestamp time.Time
}

func (h *Activities) NewClubSupporterSubscriptionPaymentDeposit(ctx context.Context, input NewClubSupporterSubscriptionPaymentDepositInput) error {

	currency, err := money.CurrencyFromString(input.Currency)

	if err != nil {
		return err
	}

	return h.ringer.NewClubSupporterSubscriptionPaymentDeposit(
		ctx,
		input.AccountId,
		input.ClubId,
		input.TransactionId,
		input.Timestamp,
		billing.UnmarshalPricingFromDatabase(currency, input.Amount),
	)
}
