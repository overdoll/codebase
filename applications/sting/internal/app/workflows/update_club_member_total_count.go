package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

func UpdateClubMemberTotalCount(ctx workflow.Context, clubId string) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	//// sleep
	//if err := workflow.Sleep(ctx, time.Hour*1); err != nil {
	//	return err
	//}

	if err := workflow.ExecuteActivity(ctx, a.UpdateClubMemberTotalCount, clubId).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
