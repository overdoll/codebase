package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/stella/internal/app/workflows/activities"
)

type RemoveClubSupporterInput struct {
	ClubId    string
	AccountId string
}

func RemoveClubSupporter(ctx workflow.Context, input RemoveClubSupporterInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	// unmark as supporter
	if err := workflow.ExecuteActivity(ctx, a.UnMarkClubMemberSupporter,
		activities.UnMarkClubMemberSupporterInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to unmark club member supporter", "Error", err)
		return err
	}

	return nil

}
