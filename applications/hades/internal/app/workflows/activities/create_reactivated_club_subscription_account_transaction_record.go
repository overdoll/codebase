package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type CreateReactivatedClubSubscriptionAccountTransactionRecordInput struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId *string
	NextBillingDate      time.Time
}

func (h *Activities) CreateReactivatedClubSubscriptionAccountTransactionRecord(ctx context.Context, input CreateReactivatedClubSubscriptionAccountTransactionRecordInput) error {

	transaction, err := billing.NewReactivatedClubSubscriptionAccountTransaction(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		time.Now(),
		input.NextBillingDate,
	)

	if err != nil {
		return err
	}

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
