package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/stella/internal/app/workflows/activities"
	"overdoll/libraries/support"
)

type UnSuspendClubInput struct {
	ClubId    string
	AccountId string
}

func UnSuspendClub(ctx workflow.Context, input UnSuspendClubInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	uniqueId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	var a *activities.Activities

	// suspend the club + create the log
	if err := workflow.ExecuteActivity(ctx, a.UnSuspendClub,
		activities.UnSuspendClubInput{
			SuspensionLogId: *uniqueId,
			ClubId:          input.ClubId,
			AccountId:       input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.RemoveClubSuspension,
		activities.RemoveClubSuspensionInput{
			ClubId: input.ClubId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
