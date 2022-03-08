package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"strconv"
)

type CreateVoidClubSubscriptionAccountTransactionRecordInput struct {
	AccountId string

	CCBillSubscriptionId string

	ClubId    string
	Timestamp string

	Currency string
	Amount   string
	Reason   string
}

func (h *Activities) CreateVoidClubSubscriptionAccountTransactionRecord(ctx context.Context, input CreateRefundClubSubscriptionAccountTransactionRecordInput) error {

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return err
	}

	var amount float64
	var currency string

	ccbillSubscription, err := h.billing.GetCCBillSubscriptionDetailsByIdOperator(ctx, input.CCBillSubscriptionId)

	if err != nil {
		return err
	}

	if input.Amount != "" {
		amount, err = strconv.ParseFloat(input.Amount, 64)

		if err != nil {
			return err
		}

	} else {
		amount = ccbillSubscription.BilledInitialPrice()
	}

	if input.Currency != "" {
		currency = input.Currency
	} else {
		currency = ccbillSubscription.BilledCurrency().String()
	}

	transaction, err := billing.NewVoidClubSubscriptionAccountTransactionFromCCBill(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		timestamp,
		amount,
		currency,
		input.Reason,
	)

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
