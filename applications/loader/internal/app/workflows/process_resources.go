package workflows

import (
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/loader/internal/app/workflows/activities"
	"overdoll/libraries/errors"
	"time"
)

type ProcessResourcesInput struct {
	ItemId      string
	ResourceIds []string
	Source      string
	IsNotFound  bool
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

	totalTimes := 2

	for i := 0; i < totalTimes; i++ {

		if i == 1 {
			// first error, we sleep
			if err := workflow.Sleep(ctx, time.Second*10); err != nil {
				logger.Error("failed to sleep", "Error", err)
				return err
			}
		}

		if err := workflow.ExecuteActivity(ctx, a.SendCallback,
			activities.SendCallbackInput{
				ItemId:      input.ItemId,
				ResourceIds: input.ResourceIds,
				Source:      input.Source,
			},
		).Get(ctx, nil); err != nil {

			var applicationErr *temporal.ApplicationError
			if errors.As(err, &applicationErr) {
				switch applicationErr.Type() {
				case "ErrorResourceCallbackNotFound":

					// on second try, if we get another not found error, we break out
					if i == 1 {
						input.IsNotFound = true
						break
					}

					continue
				}
			}

			logger.Error("failed to send callback", "Error", err)
			return err
		}

		// if we get here, break out of loop and finish
		break
	}

	return nil
}
