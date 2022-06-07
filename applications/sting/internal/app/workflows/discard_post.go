package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type DiscardPostInput struct {
	PostId string
}

func DiscardPost(ctx workflow.Context, input DiscardPostInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.DiscardPost,
		activities.DiscardPostInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to discard post", "Error", err)
		return err
	}

	return nil
}
