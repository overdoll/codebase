package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/parley/internal/app/workflows/activities"
)

func IssueClubInfractionManual(ctx workflow.Context, clubId string) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.RemoveClubFromSearches, clubId).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
