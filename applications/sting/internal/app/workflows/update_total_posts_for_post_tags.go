package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type UpdateTotalPostsForPostTagsInput struct {
	PostId string
}

func UpdateTotalPostsForPostTags(ctx workflow.Context, input UpdateTotalPostsForPostTagsInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.UpdateTotalPostsForPostTags,
		activities.UpdateTotalPostsForPostTagsInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to update total posts for post tags", "Error", err)
		return err
	}

	return nil
}
