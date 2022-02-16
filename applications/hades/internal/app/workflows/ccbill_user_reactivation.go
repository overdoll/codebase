package workflows

import (
	"go.temporal.io/sdk/workflow"
)

type CCBillUserReactivationPayload struct {
	TransactionId   string `json:"transactionId"`
	SubscriptionId  string `json:"subscriptionId"`
	Price           string `json:"price"`
	ClientAccnum    string `json:"clientAccnum"`
	ClientSubacc    string `json:"clientSubacc"`
	Timestamp       string `json:"timestamp"`
	Email           string `json:"email"`
	NextRenewalDate string `json:"nextRenewalDate"`
}

func CCBillUserReactivation(ctx workflow.Context, payload CCBillUserReactivationPayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	return nil
}
