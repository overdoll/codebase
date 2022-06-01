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
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, input.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		logger.Error("failed to get ccbill subscription details", "Error", err)
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
		logger.Error("failed to mark account club supporter subscription cancelled", "Error", err)
		return err
	}

	// send cancellation notification
	if err := workflow.ExecuteActivity(ctx, a.SendAccountClubSupporterSubscriptionCancellationNotification,
		activities.SendAccountClubSupporterSubscriptionCancellationNotificationInput{
			AccountClubSupporterSubscriptionId: subscriptionDetails.AccountClubSupporterSubscriptionId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to send account club supporter subscription cancellation notification", "Error", err)
		return err
	}

	return nil
}
