package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type CancelAccountClubSupporterSubscriptionInput struct {
	AccountClubSupporterSubscriptionId string
	CancellationReasonId               string
}

func CancelAccountClubSupporterSubscription(ctx workflow.Context, input CancelAccountClubSupporterSubscriptionInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	// actually cancel the subscription
	if err := workflow.ExecuteActivity(ctx, a.CancelAccountClubSupporterSubscription,
		activities.CancelAccountClubSupporterSubscriptionInput{
			AccountClubSupporterSubscriptionId: input.AccountClubSupporterSubscriptionId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to cancel account club supporter subscription", "Error", err)
		return err
	}

	// now, append the cancellation reason
	if err := workflow.ExecuteActivity(ctx, a.AppendCancellationReasonToAccountClubSupporterSubscription,
		activities.AppendCancellationReasonToAccountClubSupporterSubscriptionInput{
			AccountClubSupporterSubscriptionId: input.AccountClubSupporterSubscriptionId,
			CancellationReasonId:               input.CancellationReasonId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to append cancellation reason", "Error", err)
		return err
	}

	return nil
}
