package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
	"time"
)

type GenerateCategoryBannerInput struct {
	CategoryId string
	PostId     string
	WaitPeriod time.Duration
}

func GenerateCategoryBanner(ctx workflow.Context, input GenerateCategoryBannerInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	// sleep for the duration of the wait period
	if err := workflow.Sleep(ctx, input.WaitPeriod); err != nil {
		logger.Error("failed to sleep", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.UpdateCategoryBanner,
		activities.UpdateCategoryBannerInput{
			PostId:     input.PostId,
			CategoryId: input.CategoryId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to update category banner", "Error", err)
		return err
	}

	return nil
}
