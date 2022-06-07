package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/money"
)

type GetOrCreateCCBillSubscriptionAndCheckForDuplicatesInput struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string

	AccountClubSupporterSubscriptionId string

	CardBin            string
	CardType           string
	CardLast4          string
	CardExpirationDate string

	AccountingCurrency       money.Currency
	AccountingInitialPrice   uint64
	AccountingRecurringPrice uint64

	BilledCurrency       money.Currency
	BilledInitialPrice   uint64
	BilledRecurringPrice uint64

	SubscriptionCurrency       money.Currency
	SubscriptionInitialPrice   uint64
	SubscriptionRecurringPrice uint64

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

type GetOrCreateCCBillSubscriptionAndCheckForDuplicatesPayload struct {
	Duplicate bool
}

func (h *Activities) GetOrCreateCCBillSubscriptionAndCheckForDuplicates(ctx context.Context, input GetOrCreateCCBillSubscriptionAndCheckForDuplicatesInput) (*GetOrCreateCCBillSubscriptionAndCheckForDuplicatesPayload, error) {

	// make sure view subscription status works here
	_, err := h.ccbill.ViewSubscriptionStatus(ctx, input.CCBillSubscriptionId)

	if err != nil {
		return nil, err
	}

	// if we reached here, we have a brand-new subscription, so we construct it

	card, err := billing.NewCard(input.CardBin, input.CardType, input.CardLast4, input.CardExpirationDate)

	if err != nil {
		return nil, err
	}

	contact, err := billing.NewContact(input.FirstName, input.LastName, input.Email, input.PhoneNumber)

	if err != nil {
		return nil, err
	}

	address, err := billing.NewAddress(input.AddressLine1, input.City, input.State, input.Country, input.PostalCode)

	if err != nil {
		return nil, err
	}

	paymentMethod, err := billing.NewPaymentMethod(card, contact, address)

	if err != nil {
		return nil, err
	}

	ccbillSubscription, err := billing.NewCCBillSubscriptionDetails(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		paymentMethod,
		input.SubscriptionInitialPrice,
		input.SubscriptionRecurringPrice,
		input.SubscriptionCurrency,
		input.BilledInitialPrice,
		input.BilledRecurringPrice,
		input.BilledCurrency,
		input.AccountingInitialPrice,
		input.AccountingRecurringPrice,
		input.AccountingCurrency,
		input.AccountClubSupporterSubscriptionId,
	)

	if err != nil {
		return nil, err
	}

	if err := h.billing.CreateCCBillSubscriptionDetailsOperator(ctx, ccbillSubscription); err != nil {

		if err == billing.ErrAccountClubSupportSubscriptionDuplicate {
			return &GetOrCreateCCBillSubscriptionAndCheckForDuplicatesPayload{
				Duplicate: true,
			}, nil
		}

		return nil, err
	}

	// new ccbill subscription record was created
	return &GetOrCreateCCBillSubscriptionAndCheckForDuplicatesPayload{
		Duplicate: false,
	}, nil
}
