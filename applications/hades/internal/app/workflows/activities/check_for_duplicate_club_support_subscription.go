package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
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

	AccountingCurrency       string
	AccountingInitialPrice   string
	AccountingRecurringPrice string

	BilledCurrency       string
	BilledInitialPrice   string
	BilledRecurringPrice string

	SubscriptionCurrency       string
	SubscriptionInitialPrice   string
	SubscriptionRecurringPrice string

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

	accountingInitialPrice, err := ccbill.ParseCCBillCurrencyAmount(input.AccountingInitialPrice, input.AccountingCurrency)

	if err != nil {
		return nil, err
	}

	accountingRecurringPrice, err := ccbill.ParseCCBillCurrencyAmount(input.AccountingRecurringPrice, input.AccountingCurrency)

	if err != nil {
		return nil, err
	}

	subscriptionInitialPrice, err := ccbill.ParseCCBillCurrencyAmount(input.SubscriptionInitialPrice, input.SubscriptionCurrency)

	if err != nil {
		return nil, err
	}

	subscriptionRecurringPrice, err := ccbill.ParseCCBillCurrencyAmount(input.SubscriptionRecurringPrice, input.SubscriptionCurrency)

	if err != nil {
		return nil, err
	}

	billedInitialPrice, err := ccbill.ParseCCBillCurrencyAmount(input.BilledInitialPrice, input.BilledCurrency)

	if err != nil {
		return nil, err
	}

	billedRecurringPrice, err := ccbill.ParseCCBillCurrencyAmount(input.BilledRecurringPrice, input.BilledCurrency)

	if err != nil {
		return nil, err
	}

	ccbillSubscription, err := billing.NewCCBillSubscriptionDetails(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		paymentMethod,
		subscriptionInitialPrice,
		subscriptionRecurringPrice,
		input.SubscriptionCurrency,
		billedInitialPrice,
		billedRecurringPrice,
		input.BilledCurrency,
		accountingInitialPrice,
		accountingRecurringPrice,
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
