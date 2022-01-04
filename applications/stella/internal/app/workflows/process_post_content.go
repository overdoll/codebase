package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

func ProcessPostContent(ctx workflow.Context, postId string) error {

	ctx = workflow.WithActivityOptions(ctx, workflows.options)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.ProcessPostContent, postId).Get(ctx, nil); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.IndexPost, postId).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
