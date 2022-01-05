package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/loader/internal/app/workflows/activities"
)

func ProcessResources(ctx workflow.Context, itemId, resourceIds []string) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.ProcessResources, itemId, resourceIds).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
