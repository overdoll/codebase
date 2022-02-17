package activities

import (
	"context"
)

type CreateChargebackAccountTransactionRecord struct {
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

func (h *Activities) CreateChargebackAccountTransactionRecord(ctx context.Context, payload CreateChargebackAccountTransactionRecord) error {
	return nil
}
