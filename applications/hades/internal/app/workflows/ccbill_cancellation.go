package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
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

	// create cancelled record
	if err := workflow.ExecuteActivity(ctx, a.CreateCancelledAccountTransactionRecord,
		activities.CreateCancelledClubSubscriptionAccountTransactionRecordInput{
			CCBillSubscriptionId: input.SubscriptionId,
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			Timestamp:            input.Timestamp,
			Reason:               input.Reason,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// mark as cancelled to tell the user the new state
	if err := workflow.ExecuteActivity(ctx, a.MarkAccountClubSupportCancelled,
		activities.MarkAccountClubSupportCancelledInput{
			CCBillSubscriptionId: input.SubscriptionId,
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			CancelledAt:          input.Timestamp,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
