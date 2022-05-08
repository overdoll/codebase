package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/stella/internal/app/workflows/activities"
)

type UnTerminateClubInput struct {
	ClubId string
}

func UnTerminateClub(ctx workflow.Context, input UnTerminateClubInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.UnTerminateClub,
		activities.UnTerminateClubInput{
			ClubId: input.ClubId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.RemoveTerminatedClub,
		activities.RemoveTerminatedClubInput{
			ClubId: input.ClubId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
