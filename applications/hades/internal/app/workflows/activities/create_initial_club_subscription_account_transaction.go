package activities

import (
	"context"
	"fmt"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type CreateInitialClubSubscriptionAccountTransactionInput struct {
	AccountId                          string
	TransactionId                      string
	AccountClubSupporterSubscriptionId string

	Timestamp time.Time

	Currency string
	Amount   int64

	BillingDate     time.Time
	NextBillingDate time.Time
}

func (h *Activities) CreateInitialClubSubscriptionAccountTransaction(ctx context.Context, input CreateInitialClubSubscriptionAccountTransactionInput) error {

	transaction, err := billing.NewInitialPaymentClubSubscriptionAccountTransaction(
		input.AccountId,
		input.TransactionId,
		input.AccountClubSupporterSubscriptionId,
		input.Timestamp,
		input.BillingDate,
		input.NextBillingDate,
		input.Amount,
		input.Currency,
	)

	if err != nil {
		return err
	}

	if err := h.billing.CreateAccountTransactionOperator(ctx, transaction); err != nil {
		return fmt.Errorf("failed to create transaction history: %s", err)
	}

	if err := h.bi.IndexAccountTransaction(ctx, transaction); err != nil {
		return err
	}

	return nil
}
