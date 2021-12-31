package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

func RemoveClubMember(ctx workflow.Context, clubId, accountId string) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	// remove the club member from list
	if err := workflow.ExecuteActivity(ctx, a.RemoveClubMemberFromList, clubId, accountId).Get(ctx, nil); err != nil {
		return err
	}

	// spawn a child workflow asynchronously to count the total club member count
	// will also ensure we only have 1 of this workflow running at any time
	childWorkflowOptions := workflow.ChildWorkflowOptions{
		WorkflowID:        "UpdateClubMemberTotalCount_" + clubId,
		ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
	}

	ctx = workflow.WithChildOptions(ctx, childWorkflowOptions)
	childWorkflowFuture := workflow.ExecuteChildWorkflow(ctx, UpdateClubMemberTotalCount, clubId)

	if err := childWorkflowFuture.GetChildWorkflowExecution().Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
