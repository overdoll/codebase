package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/loader/internal/app/workflows/activities"
)

type ProcessResourcesInput struct {
	ItemId      string
	ResourceIds []string
	Source      string
}

func ProcessResources(ctx workflow.Context, input ProcessResourcesInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.ProcessResources,
		activities.ProcessResourcesInput{
			ItemId:      input.ItemId,
			ResourceIds: input.ResourceIds,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to process resources", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.SendCallback,
		activities.SendCallbackInput{
			ItemId:      input.ItemId,
			ResourceIds: input.ResourceIds,
			Source:      input.Source,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to send callback", "Error", err)
		return err
	}

	return nil
}
