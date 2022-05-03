package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/stella/internal/app/workflows/activities"
)

type NewSupporterPostInput struct {
	ClubId string
}

func NewSupporterPost(ctx workflow.Context, input NewSupporterPostInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var payload *activities.UpdateClubNextSupporterPostTimePayload

	// update the club's next supporter post time, indicating that they posted a supporter-only post
	if err := workflow.ExecuteActivity(ctx, a.UpdateClubNextSupporterPostTime,
		activities.UpdateClubNextSupporterPostTimeInput{
			ClubId:    input.ClubId,
			Timestamp: workflow.Now(ctx),
		},
	).Get(ctx, &payload); err != nil {
		return err
	}

	workflowId := "ClubSupporterPostNotifications_" + input.ClubId

	// here, we cancel the workflow if there was an existing workflow that is responsible for sending notifications
	if err := workflow.RequestCancelExternalWorkflow(ctx, workflowId, "").Get(ctx, nil); err != nil {
		return err
	}

	childCtx := workflow.WithChildOptions(ctx, workflow.ChildWorkflowOptions{
		WorkflowID:        workflowId,
		ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
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
		Get(childCtx, nil); err != nil {
		// ignore already started errors
		return err
	}

	return nil
}
