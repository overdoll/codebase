package activities

import (
	"context"
)

type CreateReactivatedAccountTransactionRecord struct {
	AccountId string
	ClubId    string
	Timestamp string

	CCBillSubscriptionId string
	CCBillTransactionId  string

	NextBillingDate string
}

func (h *Activities) CreateReactivatedAccountTransactionRecord(ctx context.Context, payload CreateReactivatedAccountTransactionRecord) error {
	return nil
}
