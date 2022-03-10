package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type CreateCancelledClubSubscriptionAccountTransactionRecordInput struct {
	AccountId string
	ClubId    string

	CCBillSubscriptionId *string

	Timestamp time.Time

	Reason string
}

func (h *Activities) CreateCancelledAccountTransactionRecord(ctx context.Context, input CreateCancelledClubSubscriptionAccountTransactionRecordInput) error {

	transaction, err := billing.NewCancelledClubSubscriptionAccountTransaction(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		input.Timestamp,
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
