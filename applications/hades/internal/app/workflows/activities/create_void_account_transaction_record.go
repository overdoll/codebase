package activities

import (
	"context"
)

type CreateVoidAccountTransactionRecord struct {
	AccountId string

	CCBillSubscriptionId string
	CCBillTransactionId  string

	ClubId    string
	Timestamp string

	Currency string
	Amount   string
	Reason   string
}

func (h *Activities) CreateVoidAccountTransactionRecord(ctx context.Context, payload CreateRefundAccountTransactionRecord) error {
	return nil
}
