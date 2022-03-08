package activities

import (
	"context"
	"fmt"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"strconv"
	"strings"
)

type CreateNewClubSubscriptionAccountTransactionRecordInput struct {
	AccountId string

	CCBillSubscriptionId string

	ClubId    string
	Timestamp string

	Currency string
	Amount   string

	BillingDate     string
	NextBillingDate string
}

func (h *Activities) CreateNewClubSubscriptionAccountTransactionRecord(ctx context.Context, input CreateNewClubSubscriptionAccountTransactionRecordInput) error {

	amount, err := strconv.ParseFloat(input.Amount, 64)

	if err != nil {
		return fmt.Errorf("failed to parse amount: %s", err)
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return fmt.Errorf("failed to parse timestamp: %s", err)
	}

	billedAtDate, err := ccbill.ParseCCBillDate(strings.Split(input.BillingDate, " ")[0])

	if err != nil {
		return fmt.Errorf("failed to parse date: %s", err)
	}

	nextBillingDate, err := ccbill.ParseCCBillDate(input.NextBillingDate)

	if err != nil {
		return fmt.Errorf("failed to parse date: %s", err)
	}

	transaction, err := billing.NewNewClubSubscriptionAccountTransactionFromCCBill(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		timestamp,
		billedAtDate,
		nextBillingDate,
		amount,
		input.Currency,
	)

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return fmt.Errorf("failed to create transaction history: %s", err)
	}

	return nil
}
