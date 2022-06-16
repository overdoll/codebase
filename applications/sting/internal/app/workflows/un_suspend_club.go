package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
	"overdoll/libraries/support"
)

type UnSuspendClubInput struct {
	ClubId    string
	AccountId string
}

func UnSuspendClub(ctx workflow.Context, input UnSuspendClubInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	uniqueId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	var a *activities.Activities

	// suspend the club + create the log
	if err := workflow.ExecuteActivity(ctx, a.UnSuspendClub,
		activities.UnSuspendClubInput{
			SuspensionLogId: uniqueId,
			ClubId:          input.ClubId,
			AccountId:       input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to un suspend club", "Error", err)
		return err
	}

	return nil
}
