package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"overdoll/applications/hades/internal/domain/ccbill"
	"strings"
)

type CCBillRenewalSuccessInput struct {
	TransactionId          string `json:"transactionId"`
	SubscriptionId         string `json:"subscriptionId"`
	ClientAccnum           string `json:"clientAccnum"`
	ClientSubacc           string `json:"clientSubacc"`
	Timestamp              string `json:"timestamp"`
	BilledCurrency         string `json:"billedCurrency"`
	BilledCurrencyCode     string `json:"billedCurrencyCode"`
	BilledAmount           string `json:"billedAmount"`
	AccountingCurrency     string `json:"accountingCurrency"`
	AccountingCurrencyCode string `json:"accountingCurrencyCode"`
	AccountingAmount       string `json:"accountingAmount"`
	RenewalDate            string `json:"renewalDate"`
	NextRenewalDate        string `json:"nextRenewalDate"`
	PaymentAccount         string `json:"paymentAccount"`
	PaymentType            string `json:"paymentType"`
	CardType               string `json:"cardType"`
	Last4                  string `json:"last4"`
	ExpDate                string `json:"expDate"`
}

func CCBillRenewalSuccess(ctx workflow.Context, input CCBillRenewalSuccessInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, input.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	amount, err := ccbill.ParseCCBillCurrencyAmount(input.BilledAmount, input.BilledCurrency)

	if err != nil {
		return err
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return err
	}

	billedAtDate, err := ccbill.ParseCCBillDate(strings.Split(input.RenewalDate, " ")[0])

	if err != nil {
		return err
	}

	nextBillingDate, err := ccbill.ParseCCBillDate(input.NextRenewalDate)

	// create record for failed transaction
	if err := workflow.ExecuteActivity(ctx, a.CreateInvoiceClubSubscriptionAccountTransaction,
		activities.CreateInvoiceClubSubscriptionAccountTransactionInput{
			AccountClubSupporterSubscriptionId: input.SubscriptionId,
			AccountId:                          subscriptionDetails.AccountId,
			Timestamp:                          timestamp,
			CardLast4:                          input.Last4,
			CardType:                           input.CardType,
			CardExpirationDate:                 input.ExpDate,
			Amount:                             amount,
			Currency:                           input.BilledCurrency,
			BillingDate:                        billedAtDate,
			NextBillingDate:                    nextBillingDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// update to new billing date
	if err := workflow.ExecuteActivity(ctx, a.UpdateAccountClubSupportBillingDate,
		activities.UpdateAccountClubSupportBillingDateInput{
			AccountClubSupporterSubscriptionId: input.SubscriptionId,
			NextBillingDate:                    nextBillingDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
