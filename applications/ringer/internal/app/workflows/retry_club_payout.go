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
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.MarkClubPayoutProcessing,
		activities.MarkClubPayoutProcessingInput{
			PayoutId: input.PayoutId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to mark club payout processing", "Error", err)
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
		Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
		logger.Error("failed to process club payout", "Error", err)
		return err
	}

	return nil
}
