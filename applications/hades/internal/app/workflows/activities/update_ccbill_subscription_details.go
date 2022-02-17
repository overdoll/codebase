package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type UpdateCCBillSubscriptionDetails struct {
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

func (h *Activities) UpdateCCBillSubscriptionDetails(ctx context.Context, request UpdateCCBillSubscriptionDetails) error {

	card, err := billing.NewCard(request.CardBin, request.CardType, request.CardLast4, request.CardExpirationDate)

	if err != nil {
		return err
	}

	contact, err := billing.NewContact(request.FirstName, request.LastName, request.Email, request.PhoneNumber)

	if err != nil {
		return err
	}

	address, err := billing.NewAddress(request.AddressLine1, request.City, request.State, request.Country, request.PostalCode)

	if err != nil {
		return err
	}

	paymentMethod, err := billing.NewPaymentMethod(card, contact, address)

	if err != nil {
		return err
	}

	ccbillSubscription, err := billing.NewCCBillSubscription(request.AccountId, request.ClubId, request.CCBillSubscriptionId, paymentMethod)

	if err != nil {
		return err
	}

	if err := h.billing.UpdateCCBillSubscription(ctx, ccbillSubscription); err != nil {
		return err
	}

	return nil
}
