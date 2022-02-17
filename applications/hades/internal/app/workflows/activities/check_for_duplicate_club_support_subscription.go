package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type GetOrCreateCCBillSubscriptionAndCheckForDuplicates struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string

	IdempotencyKey string

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

type GetOrCreateCCBillSubscriptionAndCheckForDuplicatesPayload struct {
	DuplicateSupportSameSubscription      bool
	DuplicateSupportDifferentSubscription bool
}

func (h *Activities) GetOrCreateCCBillSubscriptionAndCheckForDuplicates(ctx context.Context, request GetOrCreateCCBillSubscriptionAndCheckForDuplicates) (*GetOrCreateCCBillSubscriptionAndCheckForDuplicatesPayload, error) {

	ccbillSubscription, err := h.billing.GetCCBillSubscription(ctx, request.CCBillSubscriptionId)

	if err != nil && err != billing.ErrCCBillSubscriptionNotFound {
		return nil, err
	}

	// exiting ccbill subscription found
	if ccbillSubscription != nil {
		// not the same idempotency key - same subscription requested twice
		if ccbillSubscription.IdempotencyKey() != request.IdempotencyKey {
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
	subscription, err := h.billing.GetFirstAccountClubSupportSubscriptionByAccountAndClubId(ctx, request.AccountId, request.ClubId)

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

	card, err := billing.NewCard(request.CardBin, request.CardType, request.CardLast4, request.CardExpirationDate)

	if err != nil {
		return nil, err
	}

	contact, err := billing.NewContact(request.FirstName, request.LastName, request.Email, request.PhoneNumber)

	if err != nil {
		return nil, err
	}

	address, err := billing.NewAddress(request.AddressLine1, request.City, request.State, request.Country, request.PostalCode)

	if err != nil {
		return nil, err
	}

	paymentMethod, err := billing.NewPaymentMethod(card, contact, address)

	if err != nil {
		return nil, err
	}

	ccbillSubscription, err = billing.NewCCBillSubscription(request.AccountId, request.ClubId, request.CCBillSubscriptionId, paymentMethod, request.IdempotencyKey)

	if err != nil {
		return nil, err
	}

	// new ccbill subscription record was created
	return &GetOrCreateCCBillSubscriptionAndCheckForDuplicatesPayload{
		DuplicateSupportSameSubscription:      false,
		DuplicateSupportDifferentSubscription: false,
	}, nil
}
