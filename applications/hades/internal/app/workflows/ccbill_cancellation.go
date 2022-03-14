package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type CCBillCancellationInput struct {
	SubscriptionId string `json:"subscriptionId"`
	ClientAccnum   string `json:"clientAccnum"`
	ClientSubacc   string `json:"clientSubacc"`
	Timestamp      string `json:"timestamp"`
	Reason         string `json:"reason"`
}

func CCBillCancellation(ctx workflow.Context, input CCBillCancellationInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, input.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return err
	}

	// mark as cancelled to tell the user the new state
	if err := workflow.ExecuteActivity(ctx, a.MarkAccountClubSupporterSubscriptionCancelled,
		activities.MarkAccountClubSupporterSubscriptionCancelledInput{
			AccountClubSupporterSubscriptionId: input.SubscriptionId,
			CancelledAt:                        timestamp,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
