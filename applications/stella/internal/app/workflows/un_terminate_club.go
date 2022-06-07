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
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.UnTerminateClub,
		activities.UnTerminateClubInput{
			ClubId: input.ClubId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to un terminate club", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.RemoveTerminatedClub,
		activities.RemoveTerminatedClubInput{
			ClubId: input.ClubId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to remove terminated club", "Error", err)
		return err
	}

	return nil
}
