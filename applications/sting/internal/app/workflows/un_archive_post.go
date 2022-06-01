package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type UnArchivePostInput struct {
	PostId string
}

func UnArchivePost(ctx workflow.Context, input UnArchivePostInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.UnArchivePost,
		activities.UnArchivePostInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to unarchive post", "Error", err)
		return err
	}

	// spawn a child workflow asynchronously to count the total posts
	// will also ensure we only have 1 of this workflow running at any time
	childWorkflowOptions := workflow.ChildWorkflowOptions{
		WorkflowID:        "UpdatePostTagsTotalPostsCount_" + input.PostId,
		ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
	}

	childCtx := workflow.WithChildOptions(ctx, childWorkflowOptions)

	if err := workflow.ExecuteChildWorkflow(childCtx, UpdateTotalPostsForPostTags,
		UpdateTotalPostsForPostTagsInput{
			PostId: input.PostId,
		},
	).
		GetChildWorkflowExecution().
		Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
		logger.Error("failed to update total posts for post tags", "Error", err)
		return err
	}

	return nil
}
