package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"strconv"
	"strings"
)

type CreateInvoiceClubSubscriptionAccountTransactionRecordInput struct {
	AccountId string

	CCBillSubscriptionId string

	ClubId    string
	Timestamp string

	Currency string
	Amount   string

	BillingDate     string
	NextBillingDate string

	CardType           string
	CardLast4          string
	CardExpirationDate string
}

func (h *Activities) CreateInvoiceClubSubscriptionAccountTransactionRecord(ctx context.Context, input CreateInvoiceClubSubscriptionAccountTransactionRecordInput) error {

	// get ccbill subscription ID so we can "fill in the blanks" about what billing address + contact was actually charged for the invoice
	ccbillSubscription, err := h.billing.GetCCBillSubscriptionDetailsByIdOperator(ctx, input.CCBillSubscriptionId)

	if err != nil {
		return err
	}

	paymentMethod := ccbillSubscription.PaymentMethod()

	card, err := billing.NewCard("", input.CardType, input.CardLast4, input.CardExpirationDate)

	if err != nil {
		return err
	}

	// the card that was used - we keep this information
	if err := paymentMethod.UpdateCard(card); err != nil {
		return err
	}

	amount, err := strconv.ParseFloat(input.Amount, 64)

	if err != nil {
		return err
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return err
	}

	billedAtDate, err := ccbill.ParseCCBillDate(strings.Split(input.BillingDate, " ")[0])

	if err != nil {
		return err
	}

	nextBillingDate, err := ccbill.ParseCCBillDate(input.NextBillingDate)

	if err != nil {
		return err
	}

	transaction, err := billing.NewInvoiceClubSubscriptionAccountTransactionFromCCBill(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		timestamp,
		billedAtDate,
		nextBillingDate,
		amount,
		input.Currency,
		paymentMethod,
	)

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
