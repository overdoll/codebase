package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/money"
	"time"
)

type CreateInitialClubSubscriptionAccountTransactionInput struct {
	Id                                 string
	AccountId                          string
	CCBillTransactionId                string
	AccountClubSupporterSubscriptionId string
	CCBillSubscriptionId               string

	Timestamp time.Time

	Currency money.Currency
	Amount   uint64

	BillingDate     time.Time
	NextBillingDate time.Time
}

func (h *Activities) CreateInitialClubSubscriptionAccountTransaction(ctx context.Context, input CreateInitialClubSubscriptionAccountTransactionInput) error {

	// get ccbill subscription ID so we can "fill in the blanks" about what billing address + contact was actually charged for the invoice
	ccbillSubscription, err := h.billing.GetCCBillSubscriptionDetailsByIdOperator(ctx, input.CCBillSubscriptionId)

	if err != nil {
		return err
	}

	paymentMethod := ccbillSubscription.PaymentMethod()

	transaction, err := billing.NewInitialPaymentClubSubscriptionAccountTransaction(
		input.AccountId,
		input.Id,
		input.AccountClubSupporterSubscriptionId,
		input.CCBillTransactionId,
		input.CCBillSubscriptionId,
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
		return err
	}

	return nil
}
