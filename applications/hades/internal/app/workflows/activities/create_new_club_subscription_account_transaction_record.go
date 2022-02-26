package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"strconv"
)

type CreateNewClubSubscriptionAccountTransactionRecord struct {
	AccountId string

	CCBillSubscriptionId string

	ClubId    string
	Timestamp string

	Currency string
	Amount   string

	BillingDate     string
	NextBillingDate string
}

func (h *Activities) CreateNewClubSubscriptionAccountTransactionRecord(ctx context.Context, request CreateNewClubSubscriptionAccountTransactionRecord) error {

	amount, err := strconv.ParseFloat(request.Amount, 64)

	if err != nil {
		return err
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(request.Timestamp)

	if err != nil {
		return err
	}

	billedAtDate, err := ccbill.ParseCCBillDate(request.BillingDate)

	if err != nil {
		return err
	}

	nextBillingDate, err := ccbill.ParseCCBillDate(request.NextBillingDate)

	if err != nil {
		return err
	}

	transaction, err := billing.NewNewClubSubscriptionAccountTransactionFromCCBill(
		request.AccountId,
		request.ClubId,
		request.CCBillSubscriptionId,
		timestamp,
		billedAtDate,
		nextBillingDate,
		amount,
		request.Currency,
	)

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
