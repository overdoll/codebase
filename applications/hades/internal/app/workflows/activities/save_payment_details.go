package activities

import (
	"context"
)

type SavePaymentDetails struct {
	AccountId            string
	CCBillSubscriptionId string

	CardBin            string
	CardType           string
	CardLast4          string
	CardExpirationDate string

	FirstName   string
	Email       string
	LastName    string
	PhoneNumber string

	AddressLine1 string
	City         string
	Country      string
	State        string
	PostalCode   string
}

func (h *Activities) SavePaymentDetails(ctx context.Context, locker string) error {

	return nil
}
