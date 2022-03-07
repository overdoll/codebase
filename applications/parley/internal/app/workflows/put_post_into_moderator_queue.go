package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/parley/internal/app/workflows/activities"
)

type PutPostIntoModeratorQueueInput struct {
	PostId string
}

func PutPostIntoModeratorQueue(ctx workflow.Context, input PutPostIntoModeratorQueueInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var moderator *activities.GetNextModeratorPayload

	// get next available moderator
	if err := workflow.ExecuteActivity(ctx, a.GetNextModerator).Get(ctx, &moderator); err != nil {
		return err
	}

	return workflow.ExecuteActivity(ctx, a.AddPostToQueue, &activities.AddPostToQueueInput{
		PostId:      input.PostId,
		ModeratorId: moderator.ModeratorAccountId,
	}).Get(ctx, nil)
}
