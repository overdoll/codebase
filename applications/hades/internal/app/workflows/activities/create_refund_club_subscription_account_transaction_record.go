package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"strconv"
)

type CreateRefundClubSubscriptionAccountTransactionRecord struct {
	AccountId string

	CCBillSubscriptionId string
	CCBillTransactionId  string

	ClubId    string
	Timestamp string

	Currency string
	Amount   string
	Reason   string

	CardType           string
	CardLast4          string
	CardExpirationDate string
}

func (h *Activities) CreateRefundClubSubscriptionAccountTransactionRecord(ctx context.Context, request CreateRefundClubSubscriptionAccountTransactionRecord) error {

	card, err := billing.NewCard("", request.CardType, request.CardLast4, request.CardExpirationDate)

	if err != nil {
		return err
	}

	paymentMethod, err := billing.NewPaymentMethod(card, nil, nil)

	if err != nil {
		return err
	}

	amount, err := strconv.ParseFloat(request.Amount, 64)

	if err != nil {
		return err
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(request.Timestamp)

	if err != nil {
		return err
	}

	transaction, err := billing.NewRefundClubSubscriptionAccountTransactionFromCCBill(
		request.AccountId,
		request.ClubId,
		request.CCBillSubscriptionId,
		request.CCBillTransactionId,
		timestamp,
		amount,
		request.Currency,
		request.Reason,
		paymentMethod,
	)

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
