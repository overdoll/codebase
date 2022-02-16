package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/stella/internal/app/workflows/activities"
	"time"
)

func AddClubSupporter(ctx workflow.Context, clubId, accountId string, supportedAt time.Time) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var alreadyAMember bool

	// adds the club member if it doesn't exist
	if err := workflow.ExecuteActivity(ctx, a.AddClubMemberIfNotExists, clubId, accountId).Get(ctx, &alreadyAMember); err != nil {
		return err
	}

	// was not already a member, update total count
	if !alreadyAMember {
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
	}

	// mark the member as supporter
	if err := workflow.ExecuteActivity(ctx, a.MarkClubMemberAsSupporter, clubId, accountId, supportedAt).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
