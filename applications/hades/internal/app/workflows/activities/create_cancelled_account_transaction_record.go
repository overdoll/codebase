package activities

import (
	"context"
)

type CreateCancelledAccountTransactionRecord struct {
	AccountId string
	ClubId    string

	CCBillSubscriptionId string

	Timestamp string

	Reason string
}

func (h *Activities) CreateCancelledAccountTransactionRecord(ctx context.Context, payload CreateCancelledAccountTransactionRecord) error {
	return nil
}
