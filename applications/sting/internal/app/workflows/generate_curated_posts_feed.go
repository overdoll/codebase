package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type GenerateCuratedPostsFeedInput struct {
	AccountId string
}

func GenerateCuratedPostsFeed(ctx workflow.Context, input GenerateCuratedPostsFeedInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.GenerateCuratedPostsFeed,
		activities.GenerateCuratedPostsFeedInput{
			AccountId: input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to generate curated posts", "Error", err)
		return err
	}

	return nil
}
