package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"strconv"
)

type CreateChargebackClubSubscriptionAccountTransactionRecordInput struct {
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

func (h *Activities) CreateChargebackClubSubscriptionAccountTransactionRecord(ctx context.Context, input CreateChargebackClubSubscriptionAccountTransactionRecordInput) error {

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

	transaction, err := billing.NewChargebackClubSubscriptionAccountTransactionFromCCBill(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		timestamp,
		input.Reason,
		amount,
		input.Currency,
		paymentMethod,
	)

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
