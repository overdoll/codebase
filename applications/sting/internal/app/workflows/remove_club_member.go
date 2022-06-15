package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type RemoveClubMemberInput struct {
	ClubId    string
	AccountId string
}

func RemoveClubMember(ctx workflow.Context, input RemoveClubMemberInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	// remove the club member from list
	if err := workflow.ExecuteActivity(ctx, a.RemoveClubMemberFromList,
		activities.RemoveClubMemberFromListInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to remove club member from list", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.SubtractClubMember,
		activities.SubtractClubMemberInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to subtract club member", "Error", err)
		return err
	}

	return nil
}
