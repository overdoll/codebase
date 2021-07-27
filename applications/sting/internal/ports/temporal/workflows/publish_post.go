package workflows

import (
	"time"

	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/libraries/helpers"
)

func PublishPost(ctx workflow.Context, id string) error {
	ctx = workflow.WithActivityOptions(ctx, options)

	// delay publishing by 15 minutes because after this, we make non-revertible changes (creating custom resources, etc..)
	if err := workflow.Sleep(ctx, time.Minute*15); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, helpers.GetStructName(command.PostCustomResourcesHandler{}), command.PostCustomResources{PostId: id}).Get(ctx, nil); err != nil {
		return err
	}

	return workflow.ExecuteActivity(ctx, helpers.GetStructName(command.PublishPostHandler{}), command.PublishPost{PostId: id}).Get(ctx, nil)
}
