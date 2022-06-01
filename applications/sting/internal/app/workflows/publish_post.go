package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type PublishPostInput struct {
	PostId string
}

func PublishPost(ctx workflow.Context, input PublishPostInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.PublishPost,
		activities.PublishPostInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to publish post", "Error", err)
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

	// if the post has supporter-only content, we send a notification to stella that a new premium post was created
	if err := workflow.ExecuteActivity(ctx, a.CheckPostSupporterStatusAndSendNew,
		activities.CheckPostSupporterStatusAndSendNewInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to check post supporter status and send new", "Error", err)
		return err
	}

	return nil
}
