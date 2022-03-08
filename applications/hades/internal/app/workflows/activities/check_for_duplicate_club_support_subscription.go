package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"strconv"
)

type GetOrCreateCCBillSubscriptionAndCheckForDuplicatesInput struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string

	IdempotencyKey string

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
	DuplicateSupportSameSubscription      bool
	DuplicateSupportDifferentSubscription bool
}

func (h *Activities) GetOrCreateCCBillSubscriptionAndCheckForDuplicates(ctx context.Context, input GetOrCreateCCBillSubscriptionAndCheckForDuplicatesInput) (*GetOrCreateCCBillSubscriptionAndCheckForDuplicatesPayload, error) {

	ccbillSubscription, err := h.billing.GetCCBillSubscriptionDetailsByIdOperator(ctx, input.CCBillSubscriptionId)

	if err != nil && err != billing.ErrCCBillSubscriptionNotFound {
		return nil, err
	}

	// exiting ccbill subscription found
	if ccbillSubscription != nil {
		// not the same idempotency key - same subscription requested twice
		if ccbillSubscription.IdempotencyKey() != input.IdempotencyKey {
			return &GetOrCreateCCBillSubscriptionAndCheckForDuplicatesPayload{
				DuplicateSupportSameSubscription:      true,
				DuplicateSupportDifferentSubscription: false,
			}, nil
		}

		// brand-new subscription that failed along the way - continue
		return &GetOrCreateCCBillSubscriptionAndCheckForDuplicatesPayload{
			DuplicateSupportSameSubscription:      false,
			DuplicateSupportDifferentSubscription: false,
		}, nil
	}

	// ccbill subscription is nil - so we didn't have ccbill duplicate subscription ids come in.
	// now, we need to check the actual account subscription for duplicates
	subscription, err := h.billing.HasExistingAccountClubSupporterSubscriptionOperator(ctx, input.AccountId, input.ClubId)

	if err != nil && err != billing.ErrAccountClubSupportSubscriptionNotFound {
		return nil, err
	}

	// an existing subscription was found, so we need to tell it to void this new subscription
	if subscription != nil {
		return &GetOrCreateCCBillSubscriptionAndCheckForDuplicatesPayload{
			DuplicateSupportSameSubscription:      false,
			DuplicateSupportDifferentSubscription: true,
		}, nil
	}

	// if we reached here, we have a brand new subscription, so we construct it

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

	accountingInitialPrice, err := strconv.ParseFloat(input.AccountingInitialPrice, 64)

	if err != nil {
		return nil, err
	}

	accountingRecurringPrice, err := strconv.ParseFloat(input.AccountingRecurringPrice, 64)

	if err != nil {
		return nil, err
	}

	subscriptionInitialPrice, err := strconv.ParseFloat(input.SubscriptionInitialPrice, 64)

	if err != nil {
		return nil, err
	}

	subscriptionRecurringPrice, err := strconv.ParseFloat(input.SubscriptionRecurringPrice, 64)

	if err != nil {
		return nil, err
	}

	billedInitialPrice, err := strconv.ParseFloat(input.BilledInitialPrice, 64)

	if err != nil {
		return nil, err
	}

	billedRecurringPrice, err := strconv.ParseFloat(input.BilledRecurringPrice, 64)

	if err != nil {
		return nil, err
	}

	ccbillSubscription, err = billing.NewCCBillSubscriptionDetails(
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
		input.IdempotencyKey,
	)

	if err != nil {
		return nil, err
	}

	if err := h.billing.CreateCCBillSubscriptionDetailsOperator(ctx, ccbillSubscription); err != nil {
		return nil, err
	}

	// new ccbill subscription record was created
	return &GetOrCreateCCBillSubscriptionAndCheckForDuplicatesPayload{
		DuplicateSupportSameSubscription:      false,
		DuplicateSupportDifferentSubscription: false,
	}, nil
}
