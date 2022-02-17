package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"strconv"
	"time"
)

type CreateVoidClubSubscriptionAccountTransactionRecord struct {
	AccountId string

	CCBillSubscriptionId string
	CCBillTransactionId  string

	ClubId    string
	Timestamp string

	Currency string
	Amount   string
	Reason   string
}

func (h *Activities) CreateVoidClubSubscriptionAccountTransactionRecord(ctx context.Context, request CreateRefundClubSubscriptionAccountTransactionRecord) error {

	amount, err := strconv.ParseFloat(request.Amount, 64)

	if err != nil {
		return err
	}

	timestamp, err := time.Parse("2006-01-02 15:04:05", request.Timestamp)

	if err != nil {
		return err
	}

	transaction, err := billing.NewVoidClubSubscriptionAccountTransactionFromCCBill(
		request.AccountId,
		request.ClubId,
		request.CCBillSubscriptionId,
		request.CCBillTransactionId,
		timestamp,
		amount,
		request.Currency,
		request.Reason,
	)

	if err := h.billing.CreateAccountTransactionHistory(ctx, transaction); err != nil {
		return err
	}

	return nil
}
