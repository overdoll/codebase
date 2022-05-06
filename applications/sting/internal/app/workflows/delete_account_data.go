package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type DeleteAccountDataInput struct {
	AccountId string
}

func DeleteAccountData(ctx workflow.Context, input DeleteAccountDataInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	// delete account curation data
	if err := workflow.ExecuteActivity(ctx, a.DeleteAccountCurationProfile,
		activities.DeleteAccountCurationProfileInput{
			AccountId: input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	var payload *activities.GetAccountPostLikesPayload

	// get all posts that the account liked
	if err := workflow.ExecuteActivity(ctx, a.GetAccountPostLikes,
		activities.GetAccountPostLikesInput{
			AccountId: input.AccountId,
		},
	).Get(ctx, &payload); err != nil {
		return err
	}

	// for each post ID, we delete the post likes
	for _, postId := range payload.PostIds {

		// delete like record
		if err := workflow.ExecuteActivity(ctx, a.DeleteAccountPostLike,
			activities.DeleteAccountPostLikeInput{
				AccountId: input.AccountId,
				PostId:    postId,
			},
		).Get(ctx, nil); err != nil {
			return err
		}

		// spawn a child workflow that will delete the post like
		childWorkflowOptions := workflow.ChildWorkflowOptions{
			WorkflowID:        "RemovePostLike_" + postId + "_" + input.AccountId,
			ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
		}

		childCtx := workflow.WithChildOptions(ctx, childWorkflowOptions)

		if err := workflow.ExecuteChildWorkflow(childCtx, RemovePostLike,
			RemovePostLikeInput{
				PostId:    postId,
				AccountId: input.AccountId,
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

	return nil
}
