package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type CreateFailedClubSubscriptionAccountTransactionRecord struct {
	AccountId string

	CCBillSubscriptionId string
	CCBillTransactionId  string

	ClubId    string
	Timestamp string

	NextRetryDate string
	FailureReason string
	FailureCode   string
}

func (h *Activities) CreateFailedClubSubscriptionAccountTransactionRecord(ctx context.Context, request CreateFailedClubSubscriptionAccountTransactionRecord) error {

	timestamp, err := ccbill.ParseCCBillDateWithTime(request.Timestamp)

	if err != nil {
		return err
	}

	nextRetryDate, err := ccbill.ParseCCBillDate(request.NextRetryDate)

	if err != nil {
		return err
	}

	transaction, err := billing.NewFailedClubSubscriptionAccountTransactionFromCCBill(
		request.AccountId,
		request.ClubId,
		request.CCBillSubscriptionId,
		timestamp,
		nextRetryDate,
		request.FailureReason,
		request.FailureCode,
	)

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
