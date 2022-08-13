package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type TransferClubOwnershipInput struct {
	ClubId    string
	AccountId string
}

func TransferClubOwnership(ctx workflow.Context, input TransferClubOwnershipInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.UpdateClubOwner,
		activities.UpdateClubOwnerInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to update club owner", "Error", err)
		return err
	}

	return nil
}
