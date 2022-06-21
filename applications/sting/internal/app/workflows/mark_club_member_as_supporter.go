package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
	"time"
)

type MarkClubMemberAsSupporterInput struct {
	ClubId      string
	AccountId   string
	SupportedAt time.Time
}

func MarkClubMemberAsSupporter(ctx workflow.Context, input MarkClubMemberAsSupporterInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

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
