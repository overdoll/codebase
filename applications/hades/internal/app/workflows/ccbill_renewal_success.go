package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
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

	// create record for failed transaction
	if err := workflow.ExecuteActivity(ctx, a.CreateInvoiceClubSubscriptionAccountTransactionRecord,
		activities.CreateInvoiceClubSubscriptionAccountTransactionRecordInput{
			CCBillSubscriptionId: input.SubscriptionId,
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			Timestamp:            input.Timestamp,
			CardLast4:            input.Last4,
			CardType:             input.CardType,
			CardExpirationDate:   input.ExpDate,
			Amount:               input.BilledAmount,
			Currency:             input.BilledCurrency,
			BillingDate:          input.RenewalDate,
			NextBillingDate:      input.NextRenewalDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// update to new billing date
	if err := workflow.ExecuteActivity(ctx, a.UpdateAccountClubSupportBillingDate,
		activities.UpdateAccountClubSupportBillingDateInput{
			CCBillSubscriptionId: input.SubscriptionId,
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			NextBillingDate:      input.NextRenewalDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
