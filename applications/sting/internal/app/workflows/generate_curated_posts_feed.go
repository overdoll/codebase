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

	var payload *activities.GetCuratedPostsFeedDataPayload

	if err := workflow.ExecuteActivity(ctx, a.GetCuratedPostsFeedData,
		activities.GetCuratedPostsFeedDataInput{
			AccountId: input.AccountId,
		},
	).Get(ctx, &payload); err != nil {
		logger.Error("failed to get curated posts feed data", "Error", err)
		return err
	}

	// if it has a next generation time, wait first, and then generate the posts feed
	if payload.NextFeedGenerationTime != nil {
		if err := workflow.Sleep(ctx, workflow.Now(ctx).Sub(*payload.NextFeedGenerationTime)); err != nil {
			return err
		}
	}

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
