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

	timestamp, err := ccbill.ParseCCBillDateWithTime(request.Timestamp)

	if err != nil {
		return err
	}

	var amount float64
	var currency string

	ccbillSubscription, err := h.billing.GetCCBillSubscriptionDetailsByIdOperator(ctx, request.CCBillSubscriptionId)

	if err != nil {
		return err
	}

	if request.Amount != "" {
		amount, err = strconv.ParseFloat(request.Amount, 64)

		if err != nil {
			return err
		}

	} else {
		amount = ccbillSubscription.BilledInitialPrice()
	}

	if request.Currency != "" {
		currency = request.Currency
	} else {
		currency = ccbillSubscription.BilledCurrency().String()
	}

	transaction, err := billing.NewVoidClubSubscriptionAccountTransactionFromCCBill(
		request.AccountId,
		request.ClubId,
		request.CCBillSubscriptionId,
		timestamp,
		amount,
		currency,
		request.Reason,
	)

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
