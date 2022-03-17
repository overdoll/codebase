package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type UpdateCCBillSubscriptionDetailsInput struct {
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

func (h *Activities) UpdateCCBillSubscriptionDetails(ctx context.Context, input UpdateCCBillSubscriptionDetailsInput) error {

	card, err := billing.NewCard(input.CardBin, input.CardType, input.CardLast4, input.CardExpirationDate)

	if err != nil {
		return err
	}

	contact, err := billing.NewContact(input.FirstName, input.LastName, input.Email, input.PhoneNumber)

	if err != nil {
		return err
	}

	address, err := billing.NewAddress(input.AddressLine1, input.City, input.State, input.Country, input.PostalCode)

	if err != nil {
		return err
	}

	paymentMethod, err := billing.NewPaymentMethod(card, contact, address)

	if err != nil {
		return err
	}

	_, err = h.billing.UpdateCCBillSubscriptionDetailsPaymentMethodOperator(ctx, input.CCBillSubscriptionId, func(subscription *billing.CCBillSubscriptionDetails) error {

		// update saved payment method, if it exists for this subscription
		_, err = h.billing.UpdateAccountSavedPaymentMethodOperator(ctx, subscription.AccountId(), subscription.CCBillSubscriptionId(), func(savedPaymentMethod *billing.SavedPaymentMethod) error {
			return savedPaymentMethod.UpdatePaymentMethod(paymentMethod)
		})

		// the account may not have saved their payment method for this subscription, so we ignore the not existing error
		if err != nil && err != billing.ErrAccountSavedPaymentMethodNotFound {
			return err
		}

		_, err = h.billing.UpdateAccountClubSupporterPaymentMethodOperator(ctx, input.CCBillSubscriptionId, func(accountClubSupport *billing.AccountClubSupporterSubscription) error {
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
