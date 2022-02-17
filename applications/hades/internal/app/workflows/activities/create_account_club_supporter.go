package activities

import "context"

type CreateAccountClubSupporter struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
	CCBillTransactionId  string

	Timestamp string

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

	Amount   string
	Currency string

	NextRenewalDate string
}

func (h *Activities) CreateAccountClubSupporter(ctx context.Context, payload CreateAccountClubSupporter) error {
	return nil
}
