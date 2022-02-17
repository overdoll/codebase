package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"strconv"
)

type CreateAccountClubSupportSubscription struct {
	SavePaymentDetails bool

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

func (h *Activities) CreateAccountClubSupportSubscription(ctx context.Context, request CreateAccountClubSupportSubscription) error {

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

	// save payment details for later
	if request.SavePaymentDetails {

		savedPayment, err := billing.NewSavedPaymentMethodFromCCBill(request.AccountId, request.CCBillSubscriptionId, paymentMethod)

		if err != nil {
			return err
		}

		if err := h.billing.CreateAccountSavedPaymentMethod(ctx, savedPayment); err != nil {
			return err
		}
	}

	amount, err := strconv.ParseFloat(request.Amount, 64)

	if err != nil {
		return err
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(request.Timestamp)

	if err != nil {
		return err
	}

	lastBillingDate, err := ccbill.ParseCCBillDate(request.Timestamp)

	if err != nil {
		return err
	}

	nextBillingDate, err := ccbill.ParseCCBillDate(request.NextRenewalDate)

	if err != nil {
		return err
	}

	newSubscription, err := billing.NewAccountClubSupportSubscriptionFromCCBill(
		request.AccountId,
		request.ClubId,
		request.CCBillSubscriptionId,
		timestamp,
		lastBillingDate,
		nextBillingDate,
		amount,
		request.Currency,
		paymentMethod,
	)

	if err != nil {
		return err
	}

	// create new subscription
	if err := h.billing.CreateAccountClubSupportSubscription(ctx, newSubscription); err != nil {
		return err
	}

	return nil
}
