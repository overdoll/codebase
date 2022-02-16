package workflows

import (
	"go.temporal.io/sdk/workflow"
)

type CCBillRenewalFailurePayload struct {
	TransactionId  string `json:"transactionId"`
	SubscriptionId string `json:"subscriptionId"`
	ClientAccnum   string `json:"clientAccnum"`
	ClientSubacc   string `json:"clientSubacc"`
	Timestamp      string `json:"timestamp"`
	RenewalDate    string `json:"renewalDate"`
	CardType       string `json:"cardType"`
	PaymentType    string `json:"paymentType"`
	NextRetryDate  string `json:"nextRetryDate"`
	FailureReason  string `json:"failureReason"`
	FailureCode    string `json:"failureCode"`
}

func CCBillRenewalFailure(ctx workflow.Context, payload CCBillRenewalFailurePayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	return nil
}
