package workflows

import (
	"go.temporal.io/sdk/workflow"
)

type CCBillRefundPayload struct {
	TransactionId          string `json:"transactionId"`
	SubscriptionId         string `json:"subscriptionId"`
	ClientAccnum           string `json:"clientAccnum"`
	ClientSubacc           string `json:"clientSubacc"`
	Timestamp              string `json:"timestamp"`
	Currency               string `json:"currency"`
	CurrencyCode           string `json:"currencyCode"`
	Amount                 string `json:"amount"`
	AccountingCurrency     string `json:"accountingCurrency"`
	AccountingCurrencyCode string `json:"accountingCurrencyCode"`
	AccountingAmount       string `json:"accountingAmount"`
	Reason                 string `json:"reason"`
	CardType               string `json:"cardType"`
	PaymentAccount         string `json:"paymentAccount"`
	PaymentType            string `json:"paymentType"`
	Last4                  string `json:"last4"`
	ExpDate                string `json:"expDate"`
}

func CCBillRefund(ctx workflow.Context, payload CCBillRefundPayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	return nil
}
