package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/ringer/internal/app/workflows/activities"
)

type CancelClubPayoutInput struct {
	PayoutId string
}

func CancelClubPayout(ctx workflow.Context, input CancelClubPayoutInput) error {
	ctx = workflow.WithActivityOptions(ctx, options)
	var a *activities.Activities

	var payoutDetails *activities.GetClubPayoutDetailsPayload

	// get payout ID
	if err := workflow.ExecuteActivity(ctx, a.GetClubPayoutDetails, input.PayoutId).Get(ctx, &payoutDetails); err != nil {
		return err
	}

	// cancel the workflow
	if err := workflow.RequestCancelExternalWorkflow(ctx, payoutDetails.TemporalWorkflowId, "").Get(ctx, nil); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.MarkClubPayoutCancelled,
		activities.MarkClubPayoutCancelledInput{
			PayoutId: input.PayoutId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
