package activities

import (
	"context"
)

type CreateRefundAccountTransactionRecord struct {
	AccountId string

	CCBillSubscriptionId string
	CCBillTransactionId  string

	ClubId    string
	Timestamp string

	Currency string
	Amount   string
	Reason   string

	CardType           string
	CardLast4          string
	CardExpirationDate string
}

func (h *Activities) CreateRefundAccountTransactionRecord(ctx context.Context, payload CreateRefundAccountTransactionRecord) error {
	return nil
}
