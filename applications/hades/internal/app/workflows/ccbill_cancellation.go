package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"time"
)

type CCBillCancellationInput struct {
	SubscriptionId string
	Timestamp      time.Time
	Reason         string
}

func CCBillCancellation(ctx workflow.Context, input CCBillCancellationInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, input.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	// ignore duplicate subscriptions
	if subscriptionDetails.Duplicate {
		return nil
	}

	// mark as cancelled to tell the user the new state
	if err := workflow.ExecuteActivity(ctx, a.MarkAccountClubSupporterSubscriptionCancelled,
		activities.MarkAccountClubSupporterSubscriptionCancelledInput{
			AccountClubSupporterSubscriptionId: subscriptionDetails.AccountClubSupporterSubscriptionId,
			CancelledAt:                        input.Timestamp,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// send cancellation notification
	if err := workflow.ExecuteActivity(ctx, a.SendAccountClubSupporterSubscriptionCancellationNotification,
		activities.SendAccountClubSupporterSubscriptionCancellationNotificationInput{
			AccountClubSupporterSubscriptionId: subscriptionDetails.AccountClubSupporterSubscriptionId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
