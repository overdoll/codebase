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

	var a *activities.Activities

	return workflow.ExecuteActivity(ctx, a.UpdateTotalLikesForPostTags, input.PostId).Get(ctx, nil)
}
