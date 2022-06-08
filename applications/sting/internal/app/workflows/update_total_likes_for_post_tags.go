package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type UpdateTotalLikesForPostTagsInput struct {
	PostId string
}

func UpdateTotalLikesForPostTags(ctx workflow.Context, input UpdateTotalLikesForPostTagsInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.UpdateTotalLikesForPostTags,
		activities.UpdateTotalLikesForPostTagsInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to update total likes for post tags", "Error", err)
		return err
	}

	return nil
}
