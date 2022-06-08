package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/money"
	"time"
)

type CreateInvoiceClubSubscriptionAccountTransactionInput struct {
	Id                                 string
	AccountId                          string
	CCBillTransactionId                string
	AccountClubSupporterSubscriptionId string

	Timestamp time.Time

	Currency money.Currency
	Amount   uint64

	BillingDate     time.Time
	NextBillingDate time.Time

	CardBin            string
	CardType           string
	CardLast4          string
	CardExpirationDate string
}

func (h *Activities) CreateInvoiceClubSubscriptionAccountTransaction(ctx context.Context, input CreateInvoiceClubSubscriptionAccountTransactionInput) error {

	subscription, err := h.billing.GetAccountClubSupporterSubscriptionByIdOperator(ctx, input.AccountClubSupporterSubscriptionId)

	if err != nil {
		return err
	}

	// get ccbill subscription ID, so we can "fill in the blanks" about what billing address + contact was actually charged for the invoice
	ccbillSubscription, err := h.billing.GetCCBillSubscriptionDetailsByIdOperator(ctx, *subscription.CCBillSubscriptionId())

	if err != nil {
		return err
	}

	paymentMethod := ccbillSubscription.PaymentMethod()

	card, err := billing.NewCard(input.CardBin, input.CardType, input.CardLast4, input.CardExpirationDate)

	if err != nil {
		return err
	}

	// the card that was used - we keep this information
	if err := paymentMethod.UpdateCard(card); err != nil {
		return err
	}

	transaction, err := billing.NewInvoicePaymentClubSubscriptionAccountTransaction(
		input.AccountId,
		input.Id,
		input.AccountClubSupporterSubscriptionId,
		input.CCBillTransactionId,
		ccbillSubscription.CCBillSubscriptionId(),
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
