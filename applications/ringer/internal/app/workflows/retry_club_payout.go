package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
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
	if err := workflow.ExecuteActivity(ctx, a.GetClubPayoutDetails, input.PayoutId).Get(ctx, &payoutDetails); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.MarkClubPayoutProcessing,
		activities.MarkClubPayoutProcessingInput{
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

	childCtx := workflow.WithChildOptions(ctx, childWorkflowOptions)

	if err := workflow.ExecuteChildWorkflow(childCtx, ProcessClubPayout,
		ProcessClubPayoutInput{
			PayoutId: input.PayoutId,
		},
	).
		GetChildWorkflowExecution().
		Get(childCtx, nil); err != nil {
		// ignore already started errors
		if temporal.IsWorkflowExecutionAlreadyStartedError(err) {
			return nil
		}
		return err
	}

	return nil
}
