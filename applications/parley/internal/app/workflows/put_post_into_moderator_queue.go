package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/parley/internal/app/workflows/activities"
	"time"
)

type PutPostIntoModeratorQueueInput struct {
	PostId             string
	SkipAddToPostQueue bool
}

func PutPostIntoModeratorQueue(ctx workflow.Context, input PutPostIntoModeratorQueueInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	var moderator *activities.GetNextModeratorPayload

	// get next available moderator
	if err := workflow.ExecuteActivity(ctx, a.GetNextModerator).Get(ctx, &moderator); err != nil {
		logger.Error("failed to get next moderator", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.AddPostToQueue,
		activities.AddPostToQueueInput{
			PostId:      input.PostId,
			ModeratorId: moderator.ModeratorAccountId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to add post to queue", "Error", err)
		return err
	}

	if err := workflow.Sleep(ctx, time.Hour*24); err != nil {
		return err
	}

	var hasAssignedModerator bool

	if err := workflow.ExecuteActivity(ctx, a.IsPostAssignedAModerator,
		activities.IsPostAssignedAModeratorInput{
			PostId: input.PostId,
		},
	).Get(ctx, &hasAssignedModerator); err != nil {
		logger.Error("failed to check if post is assigned a moderator", "Error", err)
		return err
	}

	// no moderator assigned, break out of loop
	if !hasAssignedModerator {
		return nil
	}

	// moderator still assigned, assign a new one
	if err := workflow.ExecuteActivity(ctx, a.RemovePostFromModeratorQueue,
		activities.RemovePostFromModeratorQueueInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to remove post from moderator queue", "Error", err)
		return err
	}

	return workflow.NewContinueAsNewError(ctx, PutPostIntoModeratorQueue, PutPostIntoModeratorQueueInput{PostId: input.PostId})
}
