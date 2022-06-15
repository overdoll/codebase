package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
	"overdoll/libraries/support"
	"time"
)

type SuspendClubInput struct {
	ClubId    string
	AccountId *string
	Reason    string
	EndTime   time.Time
}

func SuspendClub(ctx workflow.Context, input SuspendClubInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	uniqueId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	var a *activities.Activities

	// suspend the club + create the log
	if err := workflow.ExecuteActivity(ctx, a.SuspendClub,
		activities.SuspendClubInput{
			SuspensionLogId: uniqueId,
			ClubId:          input.ClubId,
			AccountId:       input.AccountId,
			EndTime:         input.EndTime,
			Reason:          input.Reason,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to suspend club", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.SendClubSuspendedNotification,
		activities.SendClubSuspendedNotificationInput{
			ClubId:  input.ClubId,
			EndTime: input.EndTime,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to send club suspended notification", "Error", err)
		return err
	}

	return nil
}
