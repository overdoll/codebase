package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
	activities2 "overdoll/applications/sting/internal/app/workflows/activities"
	"time"
)

type AddClubMemberInput struct {
	ClubId    string
	AccountId string
	JoinedAt  time.Time
}

func AddClubMember(ctx workflow.Context, input AddClubMemberInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	// adds the member to the list - the account's own list and the club's list
	if err := workflow.ExecuteActivity(ctx, a.AddClubMemberToList,
		activities2.AddClubMemberToListInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
			JoinedAt:  input.JoinedAt,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to add club member to list", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.AddClubMember,
		activities2.AddClubMemberInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to add club member", "Error", err)
		return err
	}

	return nil
}
