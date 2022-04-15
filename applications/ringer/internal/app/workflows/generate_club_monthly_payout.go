package workflows

import (
	"errors"
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/ringer/internal/app/workflows/activities"
	"overdoll/libraries/support"
	"time"
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

	ts := workflow.Now(ctx)
	// if we don't specify a future time, we do our own time
	if input.FutureTime == nil {
		newTs := ts.AddDate(0, 0, 15)
		input.FutureTime = &newTs
	}

	// create a payout record
	if err := workflow.ExecuteActivity(ctx, a.CreatePayoutForClub,
		activities.CreatePayoutForClubInput{
			PayoutId:              *payoutId,
			PaymentIds:            group.PaymentIds,
			TotalAmount:           group.TotalAmount,
			Currency:              group.Currency,
			ClubId:                input.ClubId,
			Timestamp:             ts,
			AccountPayoutMethodId: payoutMethod.AccountPayoutMethodId,
		},
	).Get(ctx, nil); err != nil {
		return err
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

	// sleep until the specified future time
	if err := workflow.Sleep(ctx, ts.Sub(*input.FutureTime)); err != nil {
		return err
	}

	// spawn a child workflow to process the payout
	childWorkflowOptions := workflow.ChildWorkflowOptions{
		WorkflowID:        "ProcessClubPayout_" + input.ClubId,
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
