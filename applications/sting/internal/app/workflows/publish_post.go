package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

func PublishPost(ctx workflow.Context, postId string) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.PublishPost, postId).Get(ctx, nil); err != nil {
		return err
	}

	// spawn a child workflow asynchronously to count the total posts
	// will also ensure we only have 1 of this workflow running at any time
	childWorkflowOptions := workflow.ChildWorkflowOptions{
		WorkflowID:        "UpdatePostTagsTotalPostsCount_" + postId,
		ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
	}

	ctx = workflow.WithChildOptions(ctx, childWorkflowOptions)
	childWorkflowFuture := workflow.ExecuteChildWorkflow(ctx, UpdateTotalPostsForPostTags, postId)

	if err := childWorkflowFuture.GetChildWorkflowExecution().Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
