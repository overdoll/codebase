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

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.RemoveLikeFromPost,
		activities.RemoveLikeFromPostInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// spawn a child workflow asynchronously to count the total likes
	// will also ensure we only have 1 of this workflow running at any time
	childWorkflowOptions := workflow.ChildWorkflowOptions{
		WorkflowID:        "UpdatePostTagsTotalLikesCount_" + input.PostId,
		ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
	}

	ctx = workflow.WithChildOptions(ctx, childWorkflowOptions)

	if err := workflow.ExecuteChildWorkflow(ctx, UpdateTotalLikesForPostTags,
		UpdateTotalLikesForPostTagsInput{
			PostId: input.PostId,
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
