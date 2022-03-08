package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/loader/internal/app/workflows/activities"
)

type ProcessResourcesInput struct {
	ItemId      string
	ResourceIds []string
}

func ProcessResources(ctx workflow.Context, input ProcessResourcesInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.ProcessResources,
		activities.ProcessResourcesInput{
			ItemId:      input.ItemId,
			ResourceIds: input.ResourceIds,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
