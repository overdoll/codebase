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

	// get ccbill subscription ID so we can "fill in the blanks" about what billing address + contact was actually charged for the invoice
	ccbillSubscription, err := h.billing.GetCCBillSubscriptionDetailsByIdOperator(ctx, input.AccountClubSupporterSubscriptionId)

	if err != nil {
		return err
	}

	paymentMethod := ccbillSubscription.PaymentMethod()

	transaction, err := billing.NewInitialPaymentClubSubscriptionAccountTransaction(
		input.AccountId,
		input.TransactionId,
		input.AccountClubSupporterSubscriptionId,
		input.Timestamp,
		input.BillingDate,
		input.NextBillingDate,
		input.Amount,
		input.Currency,
		paymentMethod,
	)

	if err != nil {
		return err
	}

	if err := h.billing.CreateAccountTransactionOperator(ctx, transaction); err != nil {
		return fmt.Errorf("failed to create transaction history: %s", err)
	}

	return nil
}
