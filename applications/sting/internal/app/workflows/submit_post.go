package workflows

import (
	"time"

	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

func SubmitPost(ctx workflow.Context, id string) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.SubmitPost, id).Get(ctx, nil); err != nil {
		return err
	}

	// reassign moderator every day
	for {
		if err := workflow.Sleep(ctx, time.Hour*24); err != nil {
			return err
		}

		var assignedNewModerator bool

		err := workflow.ExecuteActivity(ctx, a.ReassignModerator, id).Get(ctx, &assignedNewModerator)

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
