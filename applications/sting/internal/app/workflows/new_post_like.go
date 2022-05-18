package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
	"time"
)

type AddPostLikeInput struct {
	PostId    string
	AccountId string
	LikedAt   time.Time
}

func AddPostLike(ctx workflow.Context, input AddPostLikeInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.CreatePostLike,
		activities.CreatePostLikeInput{
			PostId:    input.PostId,
			AccountId: input.AccountId,
			LikedAt:   input.LikedAt,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.AddLikeToPost,
		activities.AddLikeToPostInput{
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

	childCtx := workflow.WithChildOptions(ctx, childWorkflowOptions)

	if err := workflow.ExecuteChildWorkflow(childCtx, UpdateTotalLikesForPostTags,
		UpdateTotalLikesForPostTagsInput{
			PostId: input.PostId,
		},
	).
		GetChildWorkflowExecution().
		Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
		return err
	}

	return nil
}
