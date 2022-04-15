package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/ringer/internal/app/workflows/activities"
)

type ProcessClubPayoutInput struct {
	PayoutId string
}

func ProcessClubPayout(ctx workflow.Context, input ProcessClubPayoutInput) error {
	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	const NumberOfAttempts = 3
	for i := 1; i < NumberOfAttempts; i++ {

		var payload *activities.ProcessClubPayoutPayload

		// process payout (or attempt to)
		if err := workflow.ExecuteActivity(ctx, a.ProcessClubPayout,
			activities.ProcessClubPayoutInput{
				PayoutId: input.PayoutId,
			},
		).Get(ctx, payload); err != nil {
			return err
		}

		// mark if successful
		if payload.Success {

			if err := workflow.ExecuteActivity(ctx, a.MarkPayoutDeposited,
				activities.MarkPayoutDepositedInput{
					PayoutId: input.PayoutId,
				},
			).Get(ctx, nil); err != nil {
				return err
			}

			return nil
		}

		// if there's an error, we add a failure, and the loop will try again
		if err := workflow.ExecuteActivity(ctx, a.AddFailureToPayout,
			activities.AddFailureToPayoutInput{
				Timestamp: payload.Timestamp,
				PayoutId:  input.PayoutId,
				Error:     *payload.Error,
			},
		).Get(ctx, nil); err != nil {
			return err
		}
	}

	// finally, mark it as failed since there's an error
	if err := workflow.ExecuteActivity(ctx, a.MarkPayoutFailed,
		activities.MarkPayoutFailedInput{
			PayoutId: input.PayoutId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
