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

	successfulPayout := false

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

		if payload.Success {
			successfulPayout = true
			break
		}

		// if there's an error, we add a failure, and the loop will try again
		if err := workflow.ExecuteActivity(ctx, a.AddFailureToClubPayout,
			activities.AddFailureToClubPayoutInput{
				Timestamp: payload.Timestamp,
				PayoutId:  input.PayoutId,
				Error:     *payload.Error,
			},
		).Get(ctx, nil); err != nil {
			return err
		}
	}

	if !successfulPayout {
		// finally, mark it as failed since there's an error
		if err := workflow.ExecuteActivity(ctx, a.MarkClubPayoutFailed,
			activities.MarkClubPayoutFailedInput{
				PayoutId: input.PayoutId,
			},
		).Get(ctx, nil); err != nil {
			return err
		}

		return nil
	}

	// make the club payments updated
	if err := workflow.ExecuteActivity(ctx, a.MakeClubPaymentsForPayoutComplete,
		activities.MakeClubPaymentsForPayoutCompleteInput{
			PayoutId: input.PayoutId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// payout was successful, finish up logic
	var deposit *activities.MarkClubPayoutDepositedPayload

	// mark deposited, which will also release the lock and allow new payouts to be created
	if err := workflow.ExecuteActivity(ctx, a.MarkClubPayoutDeposited,
		activities.MarkClubPayoutDepositedInput{
			PayoutId: input.PayoutId,
		},
	).Get(ctx, deposit); err != nil {
		return err
	}

	// subtract from the club's balance since the payout has now been deposited
	if err := workflow.ExecuteActivity(ctx, a.SubtractFromClubBalance,
		activities.SubtractFromBalanceInput{
			ClubId:   deposit.ClubId,
			Currency: deposit.Currency,
			Amount:   deposit.Amount,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
