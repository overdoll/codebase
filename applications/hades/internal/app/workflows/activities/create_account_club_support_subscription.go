package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"strconv"
	"strings"
)

type CreateAccountClubSupportSubscription struct {
	SavePaymentDetails bool

	AccountId            string
	ClubId               string
	CCBillSubscriptionId string

	Timestamp string

	Amount   string
	Currency string

	NextRenewalDate string
}

func (h *Activities) CreateAccountClubSupportSubscription(ctx context.Context, request CreateAccountClubSupportSubscription) error {

	ccbillSubscription, err := h.billing.GetCCBillSubscriptionDetailsByIdOperator(ctx, request.CCBillSubscriptionId)

	if err != nil {
		return err
	}

	// save payment details for later
	if request.SavePaymentDetails && request.Currency == "USD" {

		savedPayment, err := billing.NewSavedPaymentMethodFromCCBill(request.AccountId, request.CCBillSubscriptionId, ccbillSubscription.PaymentMethod(), request.Currency)

		if err != nil {
			return err
		}

		if err := h.billing.CreateAccountSavedPaymentMethodOperator(ctx, savedPayment); err != nil {
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

	lastBillingDate, err := ccbill.ParseCCBillDate(strings.Split(request.Timestamp, " ")[0])

	if err != nil {
		return err
	}

	nextBillingDate, err := ccbill.ParseCCBillDate(request.NextRenewalDate)

	if err != nil {
		return err
	}

	newSubscription, err := billing.NewAccountClubSupporterSubscriptionFromCCBill(
		request.AccountId,
		request.ClubId,
		request.CCBillSubscriptionId,
		timestamp,
		lastBillingDate,
		nextBillingDate,
		amount,
		request.Currency,
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
