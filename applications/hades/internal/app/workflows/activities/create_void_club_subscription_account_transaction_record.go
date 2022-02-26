package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"strconv"
)

type CreateVoidClubSubscriptionAccountTransactionRecord struct {
	AccountId string

	CCBillSubscriptionId string

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

	timestamp, err := ccbill.ParseCCBillDateWithTime(request.Timestamp)

	if err != nil {
		return err
	}

	transaction, err := billing.NewVoidClubSubscriptionAccountTransactionFromCCBill(
		request.AccountId,
		request.ClubId,
		request.CCBillSubscriptionId,
		timestamp,
		amount,
		request.Currency,
		request.Reason,
	)

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
