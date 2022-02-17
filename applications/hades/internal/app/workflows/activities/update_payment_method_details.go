package activities

import (
	"context"
)

type UpdatePaymentMethodDetails struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
	Timestamp            string

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

func (h *Activities) UpdatePaymentMethodDetails(ctx context.Context, payload UpdatePaymentMethodDetails) error {

	return nil
}
