package workflows

import (
	"errors"
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/ringer/internal/app/workflows/activities"
	"overdoll/libraries/support"
	"time"
)

const (
	UpdatePayoutDateSignal = "UpdatePayoutDate"
)

type GenerateClubMonthlyPayoutInput struct {
	ClubId     string
	FutureTime *time.Time
}

func GenerateClubMonthlyPayout(ctx workflow.Context, input GenerateClubMonthlyPayoutInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var readyPayments *activities.GetReadyPaymentsForClubPayload

	// create a pending deposit
	if err := workflow.ExecuteActivity(ctx, a.GetReadyPaymentsForClub,
		activities.GetReadyPaymentsForClubInput{
			ClubId: input.ClubId,
		},
	).Get(ctx, readyPayments); err != nil {
		return err
	}

	// only go through payments that are ready
	if len(readyPayments.PaymentsGroup) == 0 {
		return nil
	}

	if len(readyPayments.PaymentsGroup) != 1 {
		return errors.New("payment group should only be 1")
	}

	group := readyPayments.PaymentsGroup[0]

	var payoutMethod *activities.GetClubPayoutMethodsPayload

	// create a pending deposit
	if err := workflow.ExecuteActivity(ctx, a.GetClubPayoutMethods,
		activities.GetClubPayoutMethodsInput{
			ClubId:   input.ClubId,
			Currency: group.Currency,
			Amount:   group.TotalAmount,
		},
	).Get(ctx, payoutMethod); err != nil {
		return err
	}

	// skip payout, we can't get any payout methods
	if payoutMethod == nil {
		return nil
	}

	// generate a unique payout ID
	payoutId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	var createPayload *activities.CreatePayoutForClubPayload

	ts := workflow.Now(ctx)

	// create a payout record
	if err := workflow.ExecuteActivity(ctx, a.CreatePayoutForClub,
		activities.CreatePayoutForClubInput{
			PayoutId:              *payoutId,
			PaymentIds:            group.PaymentIds,
			TotalAmount:           group.TotalAmount,
			Currency:              group.Currency,
			ClubId:                input.ClubId,
			Timestamp:             ts,
			DepositDate:           input.FutureTime,
			AccountPayoutMethodId: payoutMethod.AccountPayoutMethodId,
		},
	).Get(ctx, createPayload); err != nil {
		return err
	}

	if input.FutureTime == nil {
		input.FutureTime = &createPayload.DepositDate
	}

	depositId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	// create a deposit request or append to an existing one for this month
	if err := workflow.ExecuteActivity(ctx, a.AppendOrCreateDepositRequest,
		activities.AppendOrCreateDepositRequestInput{
			DepositId: *depositId,
			PayoutId:  *payoutId,
			Timestamp: ts,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	timerFired := false

	wakeupChannel := workflow.GetSignalChannel(ctx, UpdatePayoutDateSignal)

	// basically here, we wait until our specified future time, when the deposit is supposed to actually occur.
	// we can delay a payout at any time, so this supports updating the time
	// source: https://github.com/temporalio/samples-go/blob/main/updatabletimer/workflow.go
	for !timerFired && ctx.Err() == nil {
		timerCtx, timerCancel := workflow.WithCancel(ctx)
		duration := input.FutureTime.Sub(workflow.Now(timerCtx))
		timer := workflow.NewTimer(timerCtx, duration)

		workflow.NewSelector(timerCtx).
			AddFuture(timer, func(f workflow.Future) {
				// if a timer returned an error then it was canceled
				if err := f.Get(timerCtx, nil); err == nil {
					timerFired = true
				}
			}).
			AddReceive(wakeupChannel, func(c workflow.ReceiveChannel, more bool) {
				timerCancel()                          // cancel outstanding timer
				c.Receive(timerCtx, &input.FutureTime) // update wake-up time
			}).
			Select(timerCtx)

		if !timerFired {
			// schedule an activity to update settlement date for the payout
			if err := workflow.ExecuteActivity(timerCtx, a.UpdatePayoutDepositDate,
				activities.UpdatePayoutDepositDateInput{DepositDate: *input.FutureTime},
			).Get(ctx, nil); err != nil {
				return err
			}
		}
	}

	// mark the payout as "processing" - our initial period of x days until deposit has passed
	if err := workflow.ExecuteActivity(ctx, a.MarkPayoutProcessing,
		activities.MarkPayoutProcessingInput{
			PayoutId: *payoutId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// spawn a child workflow to process the payout
	childWorkflowOptions := workflow.ChildWorkflowOptions{
		WorkflowID:        "ProcessClubPayout_" + *payoutId,
		ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
	}

	if err := workflow.ExecuteChildWorkflow(workflow.WithChildOptions(ctx, childWorkflowOptions), ProcessClubPayout,
		ProcessClubPayoutInput{
			PayoutId: *payoutId,
		},
	).
		GetChildWorkflowExecution().
		Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
