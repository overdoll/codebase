package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type CreateAccountClubSupportSubscriptionInput struct {
	SavePaymentDetails bool

	AccountId            string
	ClubId               string
	CCBillSubscriptionId *string

	Timestamp time.Time

	Amount   int64
	Currency string

	LastRenewalDate time.Time
	NextRenewalDate time.Time
}

func (h *Activities) CreateAccountClubSupportSubscription(ctx context.Context, input CreateAccountClubSupportSubscriptionInput) error {

	// get an existing expired subscription, if it exists
	expired, err := h.billing.GetExpiredAccountClubSupporterSubscriptionByAccountAndClubIdOperator(ctx, input.AccountId, input.ClubId)

	if err != nil && err != billing.ErrExpiredAccountClubSupportSubscriptionNotFound {
		return err
	}

	var supporterSince time.Time

	if expired != nil {
		// will use the expired subscription's supporterSince
		supporterSince = expired.CalculateNewSupporterDate(input.Timestamp)
	} else {
		supporterSince = input.Timestamp
	}

	ccbillSubscription, err := h.billing.GetCCBillSubscriptionDetailsByIdOperator(ctx, *input.CCBillSubscriptionId)

	if err != nil {
		return err
	}

	// save payment details for later
	if input.SavePaymentDetails {

		savedPayment, err := billing.NewSavedPaymentMethodFromCCBill(input.AccountId, input.CCBillSubscriptionId, ccbillSubscription.PaymentMethod(), input.Currency)

		if err != nil {
			return err
		}

		if err := h.billing.CreateAccountSavedPaymentMethodOperator(ctx, savedPayment); err != nil {
			return err
		}
	}

	newSubscription, err := billing.NewAccountClubSupporterSubscriptionFromCCBill(
		input.AccountId,
		input.ClubId,
		*input.CCBillSubscriptionId,
		supporterSince,
		input.LastRenewalDate,
		input.NextRenewalDate,
		input.Amount,
		input.Currency,
		ccbillSubscription.PaymentMethod(),
	)

	if err != nil {
		return err
	}

	// create new subscription
	if err := h.billing.CreateAccountClubSupporterSubscriptionOperator(ctx, newSubscription); err != nil {
		return err
	}

	// delete expired subscription, if needed
	if err := h.billing.DeleteExpiredAccountClubSupporterSubscriptionOperator(ctx, input.AccountId, input.ClubId); err != nil {
		return err
	}

	return nil
}
