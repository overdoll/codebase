package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/stella/internal/app/workflows/activities"
	"time"
)

type AddClubSupporterInput struct {
	ClubId      string
	AccountId   string
	SupportedAt time.Time
}

func AddClubSupporter(ctx workflow.Context, input AddClubSupporterInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var alreadyAMember bool

	// adds the club member if it doesn't exist
	if err := workflow.ExecuteActivity(ctx, a.AddClubMemberIfNotExists,
		activities.AddClubMemberIfNotExistsInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
		},
	).Get(ctx, &alreadyAMember); err != nil {
		return err
	}

	// was not already a member, update total count
	if !alreadyAMember {
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
	}

	// mark the member as supporter
	if err := workflow.ExecuteActivity(ctx, a.MarkClubMemberAsSupporter,
		activities.MarkClubMemberAsSupporterInput{
			ClubId:      input.ClubId,
			AccountId:   input.AccountId,
			SupportedAt: input.SupportedAt,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
