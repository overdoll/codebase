package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
	"time"
)

type GenerateSeriesBannerInput struct {
	SeriesId   string
	WaitPeriod time.Duration
}

func GenerateSeriesBanner(ctx workflow.Context, input GenerateSeriesBannerInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	// sleep for the duration of the wait period
	if err := workflow.Sleep(ctx, input.WaitPeriod); err != nil {
		logger.Error("failed to sleep", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.UpdateSeriesBanner,
		activities.UpdateSeriesBannerInput{
			SeriesId: input.SeriesId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to update series banner", "Error", err)
		return err
	}

	return nil
}
