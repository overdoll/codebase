package workflows

import (
	"go.temporal.io/sdk/workflow"
)

type CCBillCancellationPayload struct {
	SubscriptionId string `json:"subscriptionId"`
	ClientAccnum   string `json:"clientAccnum"`
	ClientSubacc   string `json:"clientSubacc"`
	Timestamp      string `json:"timestamp"`
	Reason         string `json:"reason"`
}

func CCBillCancellation(ctx workflow.Context, payload CCBillCancellationPayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	return nil
}
