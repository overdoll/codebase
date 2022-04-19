package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/ringer/internal/app/workflows/activities"
)

type RetryClubPayoutInput struct {
	PayoutId string
}

func RetryClubPayout(ctx workflow.Context, input RetryClubPayoutInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var payoutDetails *activities.GetClubPayoutDetailsPayload

	// get payout ID
	if err := workflow.ExecuteActivity(ctx, a.GetClubPayoutDetails, input.PayoutId).Get(ctx, payoutDetails); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.MarkClubPayoutQueued,
		activities.MarkClubPayoutQueuedInput{
			PayoutId: input.PayoutId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// spawn a child workflow to process the payout
	childWorkflowOptions := workflow.ChildWorkflowOptions{
		WorkflowID:        "ProcessClubPayout_" + input.PayoutId,
		ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
	}

	if err := workflow.ExecuteChildWorkflow(workflow.WithChildOptions(ctx, childWorkflowOptions), ProcessClubPayout,
		ProcessClubPayoutInput{
			PayoutId: input.PayoutId,
		},
	).
		GetChildWorkflowExecution().
		Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
