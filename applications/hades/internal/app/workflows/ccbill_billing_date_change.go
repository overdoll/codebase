package workflows

import (
	"go.temporal.io/sdk/workflow"
)

type CCBillBillingDateChangePayload struct {
	SubscriptionId  string `json:"subscriptionId"`
	ClientAccnum    string `json:"clientAccnum"`
	ClientSubacc    string `json:"clientSubacc"`
	Timestamp       string `json:"timestamp"`
	NextRenewalDate string `json:"nextRenewalDate"`
}

func CCBillBillingDateChange(ctx workflow.Context, payload CCBillBillingDateChangePayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	return nil
}
