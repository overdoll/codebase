package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type DeleteResourcesForPostInput struct {
	PostId      string
	ResourceIds []string
}

func DeleteResourcesForPost(ctx workflow.Context, input DeleteResourcesForPostInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.DeleteResourcesForPost,
		activities.DeleteResourcesForPostInput{
			PostId:      input.PostId,
			ResourceIds: input.ResourceIds,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to delete resources", "Error", err)
		return err
	}

	return nil
}
