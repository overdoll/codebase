package workflows

import (
	"go.temporal.io/sdk/workflow"
)

func PublishPost(ctx workflow.Context, id string) error {
	ctx = workflow.WithActivityOptions(ctx, options)

	if err := workflow.ExecuteActivity(ctx, "ReviewPostHandler.Handle", id).Get(ctx, nil); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, "PostCustomResourcesHandler.Handle", id).Get(ctx, nil); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, "PublishPostHandler.Handle", id).Get(ctx, nil); err != nil {
		return err
	}

	return workflow.ExecuteActivity(ctx, "CreatePostHandler.Handle", id).Get(ctx, nil)
}

