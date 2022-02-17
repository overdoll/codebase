package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type UpdateCCBillSubscriptionDetails struct {
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

	_, err = h.billing.UpdateCCBillSubscriptionPaymentMethod(ctx, request.CCBillSubscriptionId, func(subscription *billing.CCBillSubscription) error {

		// update saved payment method, if it exists for this subscription
		_, err = h.billing.UpdateAccountSavedPaymentMethod(ctx, subscription.AccountId(), subscription.CCBillSubscriptionId(), func(savedPaymentMethod *billing.SavedPaymentMethod) error {
			return savedPaymentMethod.UpdatePaymentMethod(paymentMethod)
		})

		// the account may not have saved their payment method for this subscription, so we ignore the not existing error
		if err != nil && err != billing.ErrAccountSavedPaymentMethodNotFound {
			return err
		}

		_, err = h.billing.UpdateAccountClubSupportPaymentMethod(ctx, subscription.AccountId(), subscription.ClubId(), subscription.CCBillSubscriptionId(), func(accountClubSupport *billing.AccountClubSupportSubscription) error {
			return accountClubSupport.UpdatePaymentMethod(paymentMethod)
		})

		if err != nil {
			return err
		}

		return subscription.UpdatePaymentMethod(paymentMethod)
	})

	if err != nil {
		return err
	}

	return nil
}
