package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type ProcessResourcesForPostInput struct {
	PostId      string
	ResourceIds []string
}

func ProcessResourcesForPost(ctx workflow.Context, input ProcessResourcesForPostInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.ProcessResourcesForPost,
		activities.ProcessResourcesForPostInput{
			PostId:      input.PostId,
			ResourceIds: input.ResourceIds,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to process resources", "Error", err)
		return err
	}

	return nil
}
