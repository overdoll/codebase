package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/stella/internal/app/workflows/activities"
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

	uniqueId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	var a *activities.Activities

	// suspend the club + create the log
	if err := workflow.ExecuteActivity(ctx, a.SuspendClub,
		activities.SuspendClubInput{
			SuspensionLogId: *uniqueId,
			ClubId:          input.ClubId,
			AccountId:       input.AccountId,
			EndTime:         input.EndTime,
			Reason:          input.Reason,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
