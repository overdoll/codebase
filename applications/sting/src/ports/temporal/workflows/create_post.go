package workflows

import (
	"time"

	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/src/app/command"
	"overdoll/libraries/helpers"
)

func CreatePost(ctx workflow.Context, id string) error {
	ctx = workflow.WithActivityOptions(ctx, options)

	if err := workflow.ExecuteActivity(ctx, helpers.GetStructName(command.NewPostHandler{}), id).Get(ctx, nil); err != nil {
		return err
	}

	// reassign moderator every day
	for {
		if err := workflow.Sleep(ctx, time.Hour*24); err != nil {
			return err
		}

		var assignedNewModerator bool

		err := workflow.ExecuteActivity(ctx, helpers.GetStructName(command.ReassignModeratorHandler{}), id).Get(ctx, &assignedNewModerator)

		if err != nil {
			return err
		}

		if assignedNewModerator {
			continue
		}

		// if a moderator was not assigned this loop (post was moderated successfully), then break out of loop
		break
	}

	return nil
}
