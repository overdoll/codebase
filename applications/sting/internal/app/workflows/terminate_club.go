package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type TerminateClubInput struct {
	ClubId    string
	AccountId string
}

func TerminateClub(ctx workflow.Context, input TerminateClubInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.TerminateClub,
		activities.TerminateClubInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to terminate club", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.AddTerminatedClub,
		activities.AddTerminatedClubInput{
			ClubId: input.ClubId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to add terminated club", "Error", err)
		return err
	}

	return nil
}
