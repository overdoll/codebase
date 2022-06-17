package workflows

import (
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/loader/internal/app/workflows/activities"
	"overdoll/libraries/errors"
)

type DeleteResourcesInput struct {
	ItemId      string
	ResourceIds []string
}

func DeleteResources(ctx workflow.Context, input DeleteResourcesInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.DeleteResources,
		activities.DeleteResourcesInput{
			ItemId:      input.ItemId,
			ResourceIds: input.ResourceIds,
		},
	).Get(ctx, nil); err != nil {
		var applicationErr *temporal.ApplicationError
		if errors.As(err, &applicationErr) {
			switch applicationErr.Type() {
			case "Recoverable":
				// if it's a recoverable error, we will continue to retry this until it's possible again, without logging the error
				return err
			}
		}

		logger.Error("failed to delete resources", "Error", err)
		return err
	}

	return nil
}
