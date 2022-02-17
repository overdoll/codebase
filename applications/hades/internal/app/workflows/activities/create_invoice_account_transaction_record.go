package activities

import (
	"context"
)

type CreateInvoiceAccountTransactionRecord struct {
	AccountId string

	CCBillSubscriptionId string
	CCBillTransactionId  string

	ClubId    string
	Timestamp string

	Currency string
	Amount   string

	BillingDate string

	CardType           string
	CardLast4          string
	CardExpirationDate string
}

func (h *Activities) CreateInvoiceAccountTransactionRecord(ctx context.Context, payload CreateInvoiceAccountTransactionRecord) error {
	return nil
}
