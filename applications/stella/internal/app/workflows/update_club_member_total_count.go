package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/stella/internal/app/workflows/activities"
	"time"
)

type UpdateClubMemberTotalCountInput struct {
	ClubId string
}

func UpdateClubMemberTotalCount(ctx workflow.Context, input UpdateClubMemberTotalCountInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	// sleep
	if err := workflow.Sleep(ctx, time.Hour*1); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.UpdateClubMemberTotalCount,
		activities.UpdateClubMemberTotalCountInput{
			ClubId: input.ClubId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
