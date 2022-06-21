package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
	"time"
)

type AddClubSupporterInput struct {
	ClubId      string
	AccountId   string
	SupportedAt time.Time
}

func AddClubSupporter(ctx workflow.Context, input AddClubSupporterInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	var alreadyAMember bool

	// adds the club member if it doesn't exist
	if err := workflow.ExecuteActivity(ctx, a.CheckIfAccountIsClubMember,
		activities.CheckIfAccountIsClubMemberInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
		},
	).Get(ctx, &alreadyAMember); err != nil {
		logger.Error("failed to check if account is club member", "Error", err)
		return err
	}

	// was not already a member, add as a club member
	if !alreadyAMember {

		childWorkflowOptions := workflow.ChildWorkflowOptions{
			WorkflowID:          "sting.AddClubMember_" + input.ClubId + "_" + input.AccountId,
			WaitForCancellation: true,
			ParentClosePolicy:   enums.PARENT_CLOSE_POLICY_REQUEST_CANCEL,
		}

		childCtx := workflow.WithChildOptions(ctx, childWorkflowOptions)

		if err := workflow.ExecuteChildWorkflow(childCtx, AddClubMember,
			AddClubMemberInput{
				ClubId:    input.ClubId,
				AccountId: input.AccountId,
			},
		).
			GetChildWorkflowExecution().
			Get(childCtx, nil); err != nil {
			logger.Error("failed to add club member", "Error", err)
			return err
		}
	}

	childWorkflowOptions := workflow.ChildWorkflowOptions{
		WorkflowID:            "sting.MarkClubMemberSupporter_" + input.ClubId + "_" + input.AccountId,
		WaitForCancellation:   true,
		ParentClosePolicy:     enums.PARENT_CLOSE_POLICY_REQUEST_CANCEL,
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE,
	}

	childCtx := workflow.WithChildOptions(ctx, childWorkflowOptions)

	if err := workflow.ExecuteChildWorkflow(childCtx, MarkClubMemberAsSupporter,
		MarkClubMemberAsSupporterInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
		},
	).
		GetChildWorkflowExecution().
		Get(childCtx, nil); err != nil {
		logger.Error("failed to add club member", "Error", err)
		return err
	}

	return nil
}
