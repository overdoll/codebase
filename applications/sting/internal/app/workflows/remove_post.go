package workflows

import (
	"time"

	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

func RemovePost(ctx workflow.Context, id string) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	if err := workflow.Sleep(ctx, time.Minute*15); err != nil {
		return err
	}

	return workflow.ExecuteActivity(ctx, a.RemovePost, id).Get(ctx, nil)
}
