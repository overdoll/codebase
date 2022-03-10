package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type CreateVoidClubSubscriptionAccountTransactionRecordInput struct {
	AccountId string

	CCBillSubscriptionId *string

	ClubId    string
	Timestamp time.Time

	Currency string
	Amount   int64
	Reason   string
}

func (h *Activities) CreateVoidClubSubscriptionAccountTransactionRecord(ctx context.Context, input CreateRefundClubSubscriptionAccountTransactionRecordInput) error {

	var amount int64
	var currency string

	ccbillSubscription, err := h.billing.GetCCBillSubscriptionDetailsByIdOperator(ctx, *input.CCBillSubscriptionId)

	if err != nil {
		return err
	}

	if input.Amount != 0 {
		amount = input.Amount

	} else {
		amount = ccbillSubscription.BilledInitialPrice()
	}

	if input.Currency != "" {
		currency = input.Currency
	} else {
		currency = ccbillSubscription.BilledCurrency().String()
	}

	transaction, err := billing.NewVoidClubSubscriptionAccountTransaction(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		input.Timestamp,
		amount,
		currency,
		input.Reason,
	)

	if err != nil {
		return err
	}

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
