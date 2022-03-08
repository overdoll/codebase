package workflows

import (
	"time"

	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type SubmitPostInput struct {
	PostId   string
	PostDate time.Time
}

func SubmitPost(ctx workflow.Context, input SubmitPostInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.CreatePixelatedResourcesForSupporterOnlyContent,
		activities.CreatePixelatedResourcesForSupporterOnlyContentInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.SubmitPost,
		activities.SubmitPostInput{
			PostId:   input.PostId,
			PostDate: input.PostDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	var inReview bool

	if err := workflow.ExecuteActivity(ctx, a.PutPostIntoModeratorQueueOrPublish,
		activities.PutPostIntoModeratorQueueOrPublishInput{
			PostId: input.PostId,
		},
	).Get(ctx, &inReview); err != nil {
		return err
	}

	if inReview {
		if err := workflow.ExecuteActivity(ctx, a.ReviewPost,
			activities.ReviewPostInput{
				PostId: input.PostId,
			},
		).Get(ctx, nil); err != nil {
			return err
		}
	} else {
		if err := workflow.ExecuteActivity(ctx, a.PublishPost,
			activities.PublishPostInput{
				PostId: input.PostId,
			},
		).Get(ctx, nil); err != nil {
			return err
		}
	}

	return nil
}
