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

	var a *activities.Activities

	return workflow.ExecuteActivity(ctx, a.UpdateTotalPostsForPostTags,
		activities.UpdateTotalPostsForPostTagsInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil)
}
