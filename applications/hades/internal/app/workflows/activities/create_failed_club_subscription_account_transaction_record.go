package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type CreateFailedClubSubscriptionAccountTransactionRecordInput struct {
	AccountId string

	CCBillSubscriptionId *string

	ClubId    string
	Timestamp time.Time

	NextRetryDate time.Time
	FailureReason string
	FailureCode   string
}

func (h *Activities) CreateFailedClubSubscriptionAccountTransactionRecord(ctx context.Context, input CreateFailedClubSubscriptionAccountTransactionRecordInput) error {

	transaction, err := billing.NewFailedClubSubscriptionAccountTransaction(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		input.Timestamp,
		input.NextRetryDate,
		input.FailureReason,
		input.FailureCode,
	)

	if err != nil {
		return err
	}

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
