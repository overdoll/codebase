package workflows

import (
	"go.temporal.io/sdk/workflow"
)

func DiscardPost(ctx workflow.Context, id string) error {
	ctx = workflow.WithActivityOptions(ctx, options)
	return workflow.ExecuteActivity(ctx, "DiscardPostHandler.Handle", id).Get(ctx, nil)
}
