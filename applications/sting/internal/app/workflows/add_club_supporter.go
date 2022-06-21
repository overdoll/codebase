package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
	"time"
)

type AddClubSupporterInput struct {
	ClubId      string
	AccountId   string
	SupportedAt time.Time
}

func AddClubSupporter(ctx workflow.Context, input AddClubSupporterInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	var alreadyAMember bool

	// adds the club member if it doesn't exist
	if err := workflow.ExecuteActivity(ctx, a.CheckIfAccountIsClubMember,
		activities.CheckIfAccountIsClubMemberInput{
			ClubId:    input.ClubId,
			AccountId: input.AccountId,
		},
	).Get(ctx, &alreadyAMember); err != nil {
		logger.Error("failed to check if account is club member", "Error", err)
		return err
	}

	// was not already a member, add as a club member
	if !alreadyAMember {
		// adds the member to the list - the account's own list and the club's list
		if err := workflow.ExecuteActivity(ctx, a.AddClubMemberToList,
			activities.AddClubMemberToListInput{
				ClubId:    input.ClubId,
				AccountId: input.AccountId,
				JoinedAt:  input.SupportedAt,
			},
		).Get(ctx, nil); err != nil {
			logger.Error("failed to add club member to list", "Error", err)
			return err
		}

		if err := workflow.ExecuteActivity(ctx, a.AddClubMember,
			activities.AddClubMemberInput{
				ClubId:    input.ClubId,
				AccountId: input.AccountId,
			},
		).Get(ctx, nil); err != nil {
			logger.Error("failed to add club member", "Error", err)
			return err
		}
	}

	// mark the member as supporter
	if err := workflow.ExecuteActivity(ctx, a.MarkClubMemberAsSupporter,
		activities.MarkClubMemberAsSupporterInput{
			ClubId:      input.ClubId,
			AccountId:   input.AccountId,
			SupportedAt: input.SupportedAt,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to mark club member as supporter", "Error", err)
		return err
	}

	return nil
}
