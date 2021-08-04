package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/activities"
	"overdoll/libraries/helpers"
)

func UndoPost(ctx workflow.Context, id string) error {
	ctx = workflow.WithActivityOptions(ctx, options)
	return workflow.ExecuteActivity(ctx, helpers.GetStructName(activities.UndoPostHandler{}), activities.UndoPost{PostId: id}).Get(ctx, nil)
}
