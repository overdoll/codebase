package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type NewSupporterPostInput struct {
	ClubId string
}

func NewSupporterPost(ctx workflow.Context, input NewSupporterPostInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities
	logger := workflow.GetLogger(ctx)

	var payload *activities.UpdateClubNextSupporterPostTimePayload

	// update the club's next supporter post time, indicating that they posted a supporter-only post
	if err := workflow.ExecuteActivity(ctx, a.UpdateClubNextSupporterPostTime,
		activities.UpdateClubNextSupporterPostTimeInput{
			ClubId:    input.ClubId,
			Timestamp: workflow.Now(ctx),
		},
	).Get(ctx, &payload); err != nil {
		logger.Error("failed to update club next supporter post time", "Error", err)
		return err
	}

	childCtx := workflow.WithChildOptions(ctx, workflow.ChildWorkflowOptions{
		WorkflowID:            "sting.ClubSupporterPostNotifications_" + input.ClubId,
		ParentClosePolicy:     enums.PARENT_CLOSE_POLICY_ABANDON,
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_TERMINATE_IF_RUNNING,
	})

	// here, we schedule a workflow that will send notifications to both us and the club owner if they
	// have not posted premium posts within x days.
	if err := workflow.ExecuteChildWorkflow(childCtx, ClubSupporterPostNotifications,
		ClubSupporterPostNotificationsInput{
			ClubId:     input.ClubId,
			FutureTime: payload.FutureTime,
		},
	).
		GetChildWorkflowExecution().
		Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
		logger.Error("failed to start club supporter post notifications workflow", "Error", err)
		return err
	}

	return nil
}
