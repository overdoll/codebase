package workflows

import (
	"time"

	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/src/app/command"
	"overdoll/libraries/helpers"
)

func DiscardPost(ctx workflow.Context, id string) error {
	ctx = workflow.WithActivityOptions(ctx, options)

	if err := workflow.Sleep(ctx, time.Minute*15); err != nil {
		return err
	}

	return workflow.ExecuteActivity(ctx, helpers.GetStructName(command.DiscardPostHandler{}), id).Get(ctx, nil)
}
