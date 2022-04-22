package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/stella/internal/app/workflows/activities"
)

type RemoveClubMemberInput struct {
	ClubId    string
	AccountId string
}

func RemoveClubMember(ctx workflow.Context, input RemoveClubMemberInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	// remove the club member from list
	if err := workflow.ExecuteActivity(ctx, a.RemoveClubMemberFromList,
		activities.RemoveClubMemberFromListInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// spawn a child workflow asynchronously to count the total club member count
	// will also ensure we only have 1 of this workflow running at any time
	childWorkflowOptions := workflow.ChildWorkflowOptions{
		WorkflowID:        "UpdateClubMemberTotalCount_" + input.ClubId,
		ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
	}

	ctx = workflow.WithChildOptions(ctx, childWorkflowOptions)

	if err := workflow.ExecuteChildWorkflow(ctx, UpdateClubMemberTotalCount,
		UpdateClubMemberTotalCountInput{
			ClubId: input.ClubId,
		},
	).
		GetChildWorkflowExecution().
		Get(ctx, nil); err != nil {
		// ignore already started errors
		if temporal.IsWorkflowExecutionAlreadyStartedError(err) {
			return nil
		}
		return err
	}

	return nil
}
