package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type CCBillRenewalSuccessPayload struct {
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

func CCBillRenewalSuccess(ctx workflow.Context, payload CCBillRenewalSuccessPayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, payload.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	// create record for failed transaction
	if err := workflow.ExecuteActivity(ctx, a.CreateInvoiceAccountTransactionRecord,
		activities.CreateInvoiceAccountTransactionRecord{
			CCBillSubscriptionId: payload.SubscriptionId,
			CCBillTransactionId:  payload.TransactionId,
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			Timestamp:            payload.Timestamp,
			CardLast4:            payload.Last4,
			CardType:             payload.CardType,
			CardExpirationDate:   payload.ExpDate,
			Amount:               payload.BilledAmount,
			Currency:             payload.BilledCurrency,
			BillingDate:          payload.RenewalDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// update to new billing date
	if err := workflow.ExecuteActivity(ctx, a.UpdateAccountClubSupportBillingDate,
		activities.UpdateAccountClubSupportBillingDate{
			CCBillSubscriptionId: payload.SubscriptionId,
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			LastBillingDate:      payload.RenewalDate,
			NextBillingDate:      payload.NextRenewalDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
