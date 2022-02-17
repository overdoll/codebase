package activities

import (
	"context"
)

type CreateExpiredAccountTransactionRecord struct {
	AccountId            string
	CCBillSubscriptionId string
	ClubId               string
	Timestamp            string
}

func (h *Activities) CreateExpiredAccountTransactionRecord(ctx context.Context, payload CreateExpiredAccountTransactionRecord) error {
	return nil
}
