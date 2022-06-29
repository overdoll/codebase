package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
	"time"
)

type GenerateAudienceBannerInput struct {
	AudienceId string
	WaitPeriod time.Duration
}

func GenerateAudienceBanner(ctx workflow.Context, input GenerateAudienceBannerInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	// sleep for the duration of the wait period
	if err := workflow.Sleep(ctx, input.WaitPeriod); err != nil {
		logger.Error("failed to sleep", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.UpdateAudienceBanner,
		activities.UpdateAudienceBannerInput{
			AudienceId: input.AudienceId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to update audience banner", "Error", err)
		return err
	}

	return nil
}
