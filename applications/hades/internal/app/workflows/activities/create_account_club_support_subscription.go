package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"strconv"
	"strings"
)

type CreateAccountClubSupportSubscriptionInput struct {
	SavePaymentDetails bool

	AccountId            string
	ClubId               string
	CCBillSubscriptionId string

	Timestamp string

	Amount   string
	Currency string

	NextRenewalDate string
}

func (h *Activities) CreateAccountClubSupportSubscription(ctx context.Context, input CreateAccountClubSupportSubscriptionInput) error {

	ccbillSubscription, err := h.billing.GetCCBillSubscriptionDetailsByIdOperator(ctx, input.CCBillSubscriptionId)

	if err != nil {
		return err
	}

	// save payment details for later
	if input.SavePaymentDetails && input.Currency == "USD" {

		savedPayment, err := billing.NewSavedPaymentMethodFromCCBill(input.AccountId, input.CCBillSubscriptionId, ccbillSubscription.PaymentMethod(), input.Currency)

		if err != nil {
			return err
		}

		if err := h.billing.CreateAccountSavedPaymentMethodOperator(ctx, savedPayment); err != nil {
			return err
		}
	}

	amount, err := strconv.ParseFloat(input.Amount, 64)

	if err != nil {
		return err
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return err
	}

	lastBillingDate, err := ccbill.ParseCCBillDate(strings.Split(input.Timestamp, " ")[0])

	if err != nil {
		return err
	}

	nextBillingDate, err := ccbill.ParseCCBillDate(input.NextRenewalDate)

	if err != nil {
		return err
	}

	newSubscription, err := billing.NewAccountClubSupporterSubscriptionFromCCBill(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		timestamp,
		lastBillingDate,
		nextBillingDate,
		amount,
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

	return nil
}
