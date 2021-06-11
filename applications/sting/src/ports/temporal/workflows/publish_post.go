package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/src/app/command"
)

func PublishPost(ctx workflow.Context, id string) error {
	ctx = workflow.WithActivityOptions(ctx, options)

	if err := workflow.ExecuteActivity(ctx, command.PostCustomResourcesHandler.Handle, id).Get(ctx, nil); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, command.PublishPostHandler.Handle, id).Get(ctx, nil); err != nil {
		return err
	}

	return workflow.ExecuteActivity(ctx, command.CreatePostHandler.Handle, id).Get(ctx, nil)
}
