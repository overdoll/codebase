package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/stella/internal/app/workflows/activities"
)

type TerminateClubInput struct {
	ClubId    string
	AccountId string
}

func TerminateClub(ctx workflow.Context, input TerminateClubInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.TerminateClub,
		activities.TerminateClubInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.AddTerminatedClub,
		activities.AddTerminatedClubInput{
			ClubId: input.ClubId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
