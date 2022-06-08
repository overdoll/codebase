package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/parley/internal/app/workflows/activities"
)

type IssueClubInfractionInput struct {
	AccountId string
	ClubId    string
	RuleId    string
}

func IssueClubInfraction(ctx workflow.Context, input IssueClubInfractionInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	var clubSuspensionLength int64

	if err := workflow.ExecuteActivity(ctx, a.IssueClubInfractionManual,
		activities.IssueClubInfractionManualInput{
			AccountId: input.AccountId,
			ClubId:    input.ClubId,
			RuleId:    input.RuleId,
		},
	).Get(ctx, &clubSuspensionLength); err != nil {
		logger.Error("failed to issue manual club infraction", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.SuspendClub,
		activities.SuspendClubInput{
			ClubId:            input.ClubId,
			Duration:          clubSuspensionLength,
			IsModerationQueue: false,
			IsPostRemoval:     false,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to suspend club", "Error", err)
		return err
	}

	return nil
}
