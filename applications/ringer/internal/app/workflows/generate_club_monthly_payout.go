package workflows

import (
	"errors"
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
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
	WorkflowId string
	CanCancel  bool
}

func GenerateClubMonthlyPayout(ctx workflow.Context, input GenerateClubMonthlyPayoutInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	// generate a unique payout ID
	payoutId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	// if workflow is cancelled, we want to clean up by cancelling the payout
	defer func() {

		if !errors.Is(ctx.Err(), workflow.ErrCanceled) {
			return
		}

		if !input.CanCancel {
			return
		}

		newCtx, _ := workflow.NewDisconnectedContext(ctx)

		if err := workflow.ExecuteActivity(newCtx, a.MarkClubPayoutCancelled,
			activities.MarkClubPayoutCancelledInput{
				PayoutId: payoutId,
			},
		).Get(newCtx, nil); err != nil {
			logger.Error("failed to cleanup cancel generate club monthly payout", "Error", err)
			return
		}
	}()

	var readyPayments *activities.GetReadyPaymentsForClubAndAppendPayload

	// create a pending deposit
	if err := workflow.ExecuteActivity(ctx, a.GetReadyPaymentsForClubAndAppend,
		activities.GetReadyPaymentsForClubAndAppendInput{
			ClubId:   input.ClubId,
			PayoutId: payoutId,
		},
	).Get(ctx, &readyPayments); err != nil {
		return err
	}

	if readyPayments == nil {
		logger.Info("workflow exited due to no ready payments")
		return nil
	}

	ts := workflow.Now(ctx)

	depositId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	var depositPayload *activities.GetOrCreateDepositRequestPayload

	// create a deposit request or append to an existing one for this month
	if err := workflow.ExecuteActivity(ctx, a.GetOrCreateDepositRequest,
		activities.GetOrCreateDepositRequestInput{
			DepositId:             depositId,
			Currency:              readyPayments.Currency,
			AccountPayoutMethodId: readyPayments.AccountPayoutMethodId,
			Timestamp:             ts,
		},
	).Get(ctx, &depositPayload); err != nil {
		return err
	}

	var createPayload *activities.CreatePayoutForClubPayload

	// create a payout record
	if err := workflow.ExecuteActivity(ctx, a.CreatePayoutForClub,
		activities.CreatePayoutForClubInput{
			TemporalWorkflowId:    input.WorkflowId,
			DepositRequestId:      depositPayload.DepositRequestId,
			PayoutId:              payoutId,
			Amount:                readyPayments.TotalAmount,
			Currency:              readyPayments.Currency,
			ClubId:                input.ClubId,
			Timestamp:             ts,
			DepositDate:           input.FutureTime,
			AccountPayoutMethodId: readyPayments.AccountPayoutMethodId,
		},
	).Get(ctx, &createPayload); err != nil {
		return err
	}

	// append to deposit request
	if err := workflow.ExecuteActivity(ctx, a.AppendToDepositRequest,
		activities.AppendToDepositRequestInput{
			PayoutId:  payoutId,
			DepositId: depositPayload.DepositRequestId,
			Amount:    readyPayments.TotalAmount,
			Currency:  readyPayments.Currency,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	if input.FutureTime == nil {
		input.FutureTime = &createPayload.DepositDate
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
			if err := workflow.ExecuteActivity(ctx, a.UpdateClubPayoutDepositDate,
				activities.UpdateClubPayoutDepositDateInput{
					PayoutId:    payoutId,
					DepositDate: *input.FutureTime,
				},
			).Get(ctx, nil); err != nil {
				return err
			}
		}
	}

	input.CanCancel = false

	// mark the payout as "processing" - our initial period of x days until deposit has passed
	if err := workflow.ExecuteActivity(ctx, a.MarkClubPayoutProcessing,
		activities.MarkClubPayoutProcessingInput{
			PayoutId: payoutId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// spawn a child workflow to process the payout
	childWorkflowOptions := workflow.ChildWorkflowOptions{
		WorkflowID:        "ProcessClubPayout_" + payoutId,
		ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
	}

	childCtx := workflow.WithChildOptions(ctx, childWorkflowOptions)

	if err := workflow.ExecuteChildWorkflow(childCtx, ProcessClubPayout,
		ProcessClubPayoutInput{
			PayoutId: payoutId,
		},
	).
		GetChildWorkflowExecution().
		Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
		return err
	}

	return nil
}
