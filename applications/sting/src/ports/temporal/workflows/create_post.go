package workflows

import (
	"time"

	"github.com/segmentio/ksuid"
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

		newId := workflow.SideEffect(ctx, func(ctx workflow.Context) interface{} {
			return ksuid.New().String()
		})

		var newPostId string
		var assignedNewModerator bool

		if err := newId.Get(&newPostId); err != nil {
			return err
		}

		err := workflow.ExecuteActivity(ctx, helpers.GetStructName(command.ReassignModeratorHandler{}), id, newPostId).Get(ctx, &assignedNewModerator)

		if err != nil {
			return err
		}

		if assignedNewModerator {
			id = newPostId
			continue
		}

		// if a moderator was not assigned this loop (post was moderated successfully), then break out of loop
		break
	}

	return nil
}
