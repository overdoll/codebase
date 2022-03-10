package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/parley/internal/app/workflows/activities"
	"time"
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

	if err := workflow.ExecuteActivity(ctx, a.AddPostToQueue,
		activities.AddPostToQueueInput{
			PostId:      input.PostId,
			ModeratorId: moderator.ModeratorAccountId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// reassign moderator every day
	for {
		if err := workflow.Sleep(ctx, time.Hour*24); err != nil {
			return err
		}

		var hasAssignedModerator bool

		if err := workflow.ExecuteActivity(ctx, a.IsPostAssignedAModerator,
			activities.IsPostAssignedAModeratorInput{
				PostId: input.PostId,
			},
		).Get(ctx, &hasAssignedModerator); err != nil {
			return err
		}

		// no moderator assigned, break out of loop
		if !hasAssignedModerator {
			break
		}

		// moderator still assigned, assign a new one

		if err := workflow.ExecuteActivity(ctx, a.RemovePostFromModeratorQueue,
			activities.RemovePostFromModeratorQueueInput{
				PostId: input.PostId,
			},
		).Get(ctx, nil); err != nil {
			return err
		}

		var moderator *activities.GetNextModeratorPayload

		// get next available moderator
		if err := workflow.ExecuteActivity(ctx, a.GetNextModerator).Get(ctx, &moderator); err != nil {
			return err
		}

		// add a new moderator
		if err := workflow.ExecuteActivity(ctx, a.AddPostToQueue,
			activities.AddPostToQueueInput{
				PostId:      input.PostId,
				ModeratorId: moderator.ModeratorAccountId,
			},
		).Get(ctx, nil); err != nil {
			return err
		}
	}

	return nil
}
