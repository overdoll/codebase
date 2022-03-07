package workflows

import (
	"time"

	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

func SubmitPost(ctx workflow.Context, id string, postDate time.Time) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.CreatePixelatedResourcesForSupporterOnlyContent, id).Get(ctx, nil); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.SubmitPost, id, postDate).Get(ctx, nil); err != nil {
		return err
	}

	var inReview bool

	if err := workflow.ExecuteActivity(ctx, a.PutPostIntoModeratorQueueOrPublish, id).Get(ctx, &inReview); err != nil {
		return err
	}

	if inReview {
		if err := workflow.ExecuteActivity(ctx, a.ReviewPost, id, postDate).Get(ctx, nil); err != nil {
			return err
		}
	} else {
		if err := workflow.ExecuteActivity(ctx, a.PublishPost, id, postDate).Get(ctx, nil); err != nil {
			return err
		}
	}

	return nil
}
