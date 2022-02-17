package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"strconv"
)

type CreateChargebackClubSubscriptionAccountTransactionRecord struct {
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

func (h *Activities) CreateChargebackClubSubscriptionAccountTransactionRecord(ctx context.Context, request CreateChargebackClubSubscriptionAccountTransactionRecord) error {

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

	transaction, err := billing.NewChargebackClubSubscriptionAccountTransactionFromCCBill(
		request.AccountId,
		request.ClubId,
		request.CCBillSubscriptionId,
		request.CCBillTransactionId,
		timestamp,
		request.Reason,
		amount,
		request.Currency,
		paymentMethod,
	)

	if err := h.billing.CreateAccountTransactionHistory(ctx, transaction); err != nil {
		return err
	}

	return nil
}
