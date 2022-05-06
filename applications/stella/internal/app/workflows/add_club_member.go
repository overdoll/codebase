package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/stella/internal/app/workflows/activities"
)

type AddClubMemberInput struct {
	ClubId    string
	AccountId string
}

func AddClubMember(ctx workflow.Context, input AddClubMemberInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	// adds the member to the list - the account's own list and the club's list
	if err := workflow.ExecuteActivity(ctx, a.AddClubMemberToList,
		activities.AddClubMemberToListInput{
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

	childCtx := workflow.WithChildOptions(ctx, childWorkflowOptions)

	if err := workflow.ExecuteChildWorkflow(childCtx, UpdateClubMemberTotalCount,
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
