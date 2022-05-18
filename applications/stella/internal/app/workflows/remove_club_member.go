package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/stella/internal/app/workflows/activities"
)

type RemoveClubMemberInput struct {
	ClubId    string
	AccountId string
}

func RemoveClubMember(ctx workflow.Context, input RemoveClubMemberInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	// remove the club member from list
	if err := workflow.ExecuteActivity(ctx, a.RemoveClubMemberFromList,
		activities.RemoveClubMemberFromListInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.SubtractClubMember,
		activities.SubtractClubMemberInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
