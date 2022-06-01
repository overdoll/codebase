package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type RemovePostLikeInput struct {
	PostId    string
	AccountId string
}

func RemovePostLike(ctx workflow.Context, input RemovePostLikeInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.DeletePostLike,
		activities.DeletePostLikeInput{
			PostId:    input.PostId,
			AccountId: input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to delete post like", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.RemoveLikeFromPost,
		activities.RemoveLikeFromPostInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to remove like from post", "Error", err)
		return err
	}

	// spawn a child workflow asynchronously to count the total likes
	// will also ensure we only have 1 of this workflow running at any time
	childWorkflowOptions := workflow.ChildWorkflowOptions{
		WorkflowID:        "UpdatePostTagsTotalLikesCount_" + input.PostId,
		ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
	}

	childCtx := workflow.WithChildOptions(ctx, childWorkflowOptions)

	if err := workflow.ExecuteChildWorkflow(childCtx, UpdateTotalLikesForPostTags,
		UpdateTotalLikesForPostTagsInput{
			PostId: input.PostId,
		},
	).
		GetChildWorkflowExecution().
		Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
		logger.Error("failed to update total likes for post tags", "Error", err)
		return err
	}

	return nil
}
