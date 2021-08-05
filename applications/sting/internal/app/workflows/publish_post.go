package workflows

import (
	"time"

	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

func PublishPost(ctx workflow.Context, id string) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	// delay publishing by 15 minutes because after this, we make non-revertible changes (creating custom resources, etc..)
	if err := workflow.Sleep(ctx, time.Minute*15); err != nil {
		return err
	}

	return workflow.ExecuteActivity(ctx, a.PublishPost, id).Get(ctx, nil)
}
