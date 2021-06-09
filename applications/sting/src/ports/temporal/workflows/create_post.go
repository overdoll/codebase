package workflows

import (
	"time"

	"github.com/segmentio/ksuid"
	"go.temporal.io/sdk/workflow"
)

func CreatePost(ctx workflow.Context, id string) error {
	ctx = workflow.WithActivityOptions(ctx, options)

	if err := workflow.ExecuteActivity(ctx, "NewPostHandler.Handle", id).Get(ctx, nil); err != nil {
		return err
	}

	// reassign moderator every day
	for true {
		if err := workflow.Await(ctx, func() bool {
			return workflow.Now(ctx).After(time.Now().AddDate(0, 0, 1))
		}); err != nil {
			return err
		}

		newId := workflow.SideEffect(ctx, func(ctx workflow.Context) interface{} {
			return ksuid.New().String()
		})

		var requiresNewModerator bool

		err := workflow.ExecuteActivity(ctx, "ReassignModeratorHandler.Handle", id, newId).Get(ctx, &requiresNewModerator)

		if err != nil {
			return err
		}

		if !requiresNewModerator {
			break
		}
	}

	return nil
}
