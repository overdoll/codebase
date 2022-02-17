package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
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

	timestamp, err := time.Parse("2006-01-02 15:04:05", request.Timestamp)

	if err != nil {
		return err
	}

	nextRetryDate, err := time.Parse("2006-01-02", request.NextRetryDate)

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

	if err := h.billing.CreateAccountTransactionHistory(ctx, transaction); err != nil {
		return err
	}

	return nil
}
