package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type CreateFailedClubSubscriptionAccountTransactionRecordInput struct {
	AccountId string

	CCBillSubscriptionId string

	ClubId    string
	Timestamp string

	NextRetryDate string
	FailureReason string
	FailureCode   string
}

func (h *Activities) CreateFailedClubSubscriptionAccountTransactionRecord(ctx context.Context, input CreateFailedClubSubscriptionAccountTransactionRecordInput) error {

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return err
	}

	nextRetryDate, err := ccbill.ParseCCBillDate(input.NextRetryDate)

	if err != nil {
		return err
	}

	transaction, err := billing.NewFailedClubSubscriptionAccountTransactionFromCCBill(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		timestamp,
		nextRetryDate,
		input.FailureReason,
		input.FailureCode,
	)

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
