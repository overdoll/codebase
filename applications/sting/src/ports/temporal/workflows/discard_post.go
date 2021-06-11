package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/src/app/command"
)

func DiscardPost(ctx workflow.Context, id string) error {
	ctx = workflow.WithActivityOptions(ctx, options)
	return workflow.ExecuteActivity(ctx, command.DiscardPostHandler.Handle, id).Get(ctx, nil)
}
