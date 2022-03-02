package activities

import (
	"context"
	"fmt"
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
		return fmt.Errorf("failed to parse amount: %s", err)
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(request.Timestamp)

	if err != nil {
		return fmt.Errorf("failed to parse timestamp: %s", err)
	}

	billedAtDate, err := ccbill.ParseCCBillDate(request.BillingDate)

	if err != nil {
		return fmt.Errorf("failed to parse date: %s", err)
	}

	nextBillingDate, err := ccbill.ParseCCBillDate(request.NextBillingDate)

	if err != nil {
		return fmt.Errorf("failed to parse date: %s", err)
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
		return fmt.Errorf("failed to create transaction history: %s", err)
	}

	return nil
}
