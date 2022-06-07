package workflows

import (
	"go.temporal.io/sdk/workflow"
	"math/rand"
	"overdoll/applications/ringer/internal/app/workflows/activities"
	"time"
)

type ProcessClubPayoutInput struct {
	PayoutId      string
	TotalAttempts int
}

func ProcessClubPayout(ctx workflow.Context, input ProcessClubPayoutInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	successfulPayout := false

	const NumberOfAttempts = 3
	for input.TotalAttempts != NumberOfAttempts {

		var err error

		switch input.TotalAttempts {
		case 0:
			err = workflow.Sleep(ctx, time.Second)
		case 1:
			// wait random minute * (between 5 and 15)
			err = workflow.Sleep(ctx, time.Minute*time.Duration(rand.Intn(15-5)+5))
		case 2:
			// wait random minute * (between 30 and 45)
			err = workflow.Sleep(ctx, time.Minute*time.Duration(rand.Intn(45-30)+30))
		}

		if err != nil {
			return err
		}

		var payload *activities.ProcessClubPayoutPayload

		// process payout (or attempt to)
		if err := workflow.ExecuteActivity(ctx, a.ProcessClubPayout,
			activities.ProcessClubPayoutInput{
				PayoutId: input.PayoutId,
			},
		).Get(ctx, &payload); err != nil {
			logger.Error("failed to process club payout", "Error", err)
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
			logger.Error("failed to add failure to club payout", "Error", err)
			return err
		}

		workflow.SideEffect(ctx, func(ctx workflow.Context) interface{} {
			input.TotalAttempts += 1
			return nil
		})
	}

	if !successfulPayout {
		// finally, mark it as failed since there's an error
		if err := workflow.ExecuteActivity(ctx, a.MarkClubPayoutFailed,
			activities.MarkClubPayoutFailedInput{
				PayoutId: input.PayoutId,
			},
		).Get(ctx, nil); err != nil {
			logger.Error("failed to mark club payout failed", "Error", err)
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
		logger.Error("failed to make club payments for payout complete", "Error", err)
		return err
	}

	// payout was successful, finish up logic
	var deposit *activities.MarkClubPayoutDepositedPayload

	// mark deposited, which will also release the lock and allow new payouts to be created
	if err := workflow.ExecuteActivity(ctx, a.MarkClubPayoutDeposited,
		activities.MarkClubPayoutDepositedInput{
			PayoutId: input.PayoutId,
		},
	).Get(ctx, &deposit); err != nil {
		logger.Error("failed to mark club payout deposited", "Error", err)
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
		logger.Error("failed to subtract from club balance", "Error", err)
		return err
	}

	return nil
}
