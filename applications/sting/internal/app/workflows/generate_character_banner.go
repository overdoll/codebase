package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
	"time"
)

type GenerateCharacterBannerInput struct {
	CharacterId string
	WaitPeriod  time.Duration
}

func GenerateCharacterBanner(ctx workflow.Context, input GenerateCharacterBannerInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	// sleep for the duration of the wait period
	if err := workflow.Sleep(ctx, input.WaitPeriod); err != nil {
		logger.Error("failed to sleep", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.UpdateCharacterBanner,
		activities.UpdateCharacterBannerInput{
			CharacterId: input.CharacterId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to update character banner", "Error", err)
		return err
	}

	return nil
}
