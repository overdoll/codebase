package activities

import (
	"context"
)

type CreateFailedAccountTransactionRecord struct {
	AccountId string

	CCBillSubscriptionId string
	CCBillTransactionId  string

	ClubId    string
	Timestamp string

	NextRetryDate string
	FailureReason string
	FailureCode   string
}

func (h *Activities) CreateFailedAccountTransactionRecord(ctx context.Context, payload CreateFailedAccountTransactionRecord) error {
	return nil
}
