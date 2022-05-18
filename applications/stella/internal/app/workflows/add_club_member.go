package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/stella/internal/app/workflows/activities"
	"time"
)

type AddClubMemberInput struct {
	ClubId    string
	AccountId string
	JoinedAt  time.Time
}

func AddClubMember(ctx workflow.Context, input AddClubMemberInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	// adds the member to the list - the account's own list and the club's list
	if err := workflow.ExecuteActivity(ctx, a.AddClubMemberToList,
		activities.AddClubMemberToListInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
			JoinedAt:  input.JoinedAt,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.AddClubMember,
		activities.AddClubMemberInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
