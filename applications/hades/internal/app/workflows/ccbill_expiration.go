package workflows

import (
	"go.temporal.io/sdk/workflow"
)

type CCBillExpirationPayload struct {
	SubscriptionId string `json:"subscriptionId"`
	ClientAccnum   string `json:"clientAccnum"`
	ClientSubacc   string `json:"clientSubacc"`
	Timestamp      string `json:"timestamp"`
}

func CCBillExpiration(ctx workflow.Context, payload CCBillExpirationPayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	return nil
}
