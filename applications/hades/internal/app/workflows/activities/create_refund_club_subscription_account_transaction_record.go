package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"strconv"
)

type CreateRefundClubSubscriptionAccountTransactionRecordInput struct {
	AccountId string

	CCBillSubscriptionId string

	ClubId    string
	Timestamp string

	Currency string
	Amount   string
	Reason   string

	CardType           string
	CardLast4          string
	CardExpirationDate string
}

func (h *Activities) CreateRefundClubSubscriptionAccountTransactionRecord(ctx context.Context, input CreateRefundClubSubscriptionAccountTransactionRecordInput) error {

	card, err := billing.NewCard("", input.CardType, input.CardLast4, input.CardExpirationDate)

	if err != nil {
		return err
	}

	paymentMethod, err := billing.NewPaymentMethod(card, nil, nil)

	if err != nil {
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

	transaction, err := billing.NewRefundClubSubscriptionAccountTransactionFromCCBill(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		timestamp,
		amount,
		input.Currency,
		input.Reason,
		paymentMethod,
	)

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
