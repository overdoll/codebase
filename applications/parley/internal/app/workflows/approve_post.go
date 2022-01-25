package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/parley/internal/app/workflows/activities"
)

func ApprovePost(ctx workflow.Context, postAuditLogId string) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.PublishPost, postAuditLogId).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
