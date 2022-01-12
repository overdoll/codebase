package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

func UpdateTotalPostsForPostTags(ctx workflow.Context, postId string) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	return workflow.ExecuteActivity(ctx, a.UpdateTotalPostsForPostTags, postId).Get(ctx, nil)
}
