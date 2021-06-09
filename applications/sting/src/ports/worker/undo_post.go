package worker

import (
	"go.temporal.io/sdk/workflow"
)

func UndoPost(ctx workflow.Context, id string) error {
	ctx = workflow.WithActivityOptions(ctx, options)

	return workflow.ExecuteActivity(ctx, "UndoPostHandler.Handle", id).Get(ctx, nil)
}
