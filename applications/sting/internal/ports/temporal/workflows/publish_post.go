package workflows

import (
	"time"

	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/activities"
	"overdoll/libraries/helpers"
)

func PublishPost(ctx workflow.Context, id string) error {
	ctx = workflow.WithActivityOptions(ctx, options)

	// delay publishing by 15 minutes because after this, we make non-revertible changes (creating custom resources, etc..)
	if err := workflow.Sleep(ctx, time.Minute*15); err != nil {
		return err
	}

	return workflow.ExecuteActivity(ctx, helpers.GetStructName(activities.PublishPostHandler{}), activities.PublishPost{PostId: id}).Get(ctx, nil)
}
