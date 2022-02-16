package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/stella/internal/app/workflows/activities"
)

func RemoveClubSupporter(ctx workflow.Context, clubId, accountId string) error {
	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	// unmark as supporter
	if err := workflow.ExecuteActivity(ctx, a.UnMarkClubMemberSupporter, clubId, accountId).Get(ctx, nil); err != nil {
		return err
	}

	return nil

}
