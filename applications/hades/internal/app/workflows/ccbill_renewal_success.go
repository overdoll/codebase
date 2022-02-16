package workflows

import (
	"go.temporal.io/sdk/workflow"
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
	CardType               string `json:"cardType"`
	PaymentAccount         string `json:"paymentAccount"`
	PaymentType            string `json:"paymentType"`
	Last4                  string `json:"last4"`
	ExpDate                string `json:"expDate"`
}

func CCBillRenewalSuccess(ctx workflow.Context, payload CCBillRenewalSuccessPayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	return nil
}
