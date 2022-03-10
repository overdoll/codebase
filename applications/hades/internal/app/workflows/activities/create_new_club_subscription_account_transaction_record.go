package activities

import (
	"context"
	"fmt"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type CreateNewClubSubscriptionAccountTransactionRecordInput struct {
	AccountId string

	CCBillSubscriptionId *string

	ClubId    string
	Timestamp time.Time

	Currency string
	Amount   int64

	BillingDate     time.Time
	NextBillingDate time.Time
}

func (h *Activities) CreateNewClubSubscriptionAccountTransactionRecord(ctx context.Context, input CreateNewClubSubscriptionAccountTransactionRecordInput) error {

	transaction, err := billing.NewNewClubSubscriptionAccountTransaction(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		input.Timestamp,
		input.BillingDate,
		input.NextBillingDate,
		input.Amount,
		input.Currency,
	)

	if err != nil {
		return err
	}

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return fmt.Errorf("failed to create transaction history: %s", err)
	}

	return nil
}
