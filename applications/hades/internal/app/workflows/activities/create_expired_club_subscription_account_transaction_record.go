package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type CreateExpiredClubSubscriptionAccountTransactionRecordInput struct {
	AccountId            string
	CCBillSubscriptionId *string
	ClubId               string
	Timestamp            time.Time
}

func (h *Activities) CreateExpiredClubSubscriptionAccountTransactionRecord(ctx context.Context, input CreateExpiredClubSubscriptionAccountTransactionRecordInput) error {

	transaction, err := billing.NewExpiredClubSubscriptionAccountTransaction(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		input.Timestamp,
	)

	if err != nil {
		return err
	}

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
