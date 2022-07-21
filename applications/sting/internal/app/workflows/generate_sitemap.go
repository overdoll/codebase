package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

func GenerateSitemap(ctx workflow.Context) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.GenerateSitemap).Get(ctx, nil); err != nil {
		logger.Error("failed to generate sitemap", "Error", err)
		return err
	}

	return nil
}
