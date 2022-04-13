package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/ringer/internal/app/workflows/activities"
	"overdoll/libraries/money"
	"overdoll/libraries/support"
	"time"
)

type ClubPaymentDepositInput struct {
	AccountTransactionId        string
	SourceAccountId             string
	DestinationClubId           string
	Amount                      int64
	Currency                    money.Currency
	Timestamp                   time.Time
	IsClubSupporterSubscription bool
}

func ClubPaymentDeposit(ctx workflow.Context, input ClubPaymentDepositInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	uniqueId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	paymentId := *uniqueId

	// create a pending deposit
	if err := workflow.ExecuteActivity(ctx, a.CreatePendingClubPaymentDeposit,
		activities.CreatePendingClubPaymentDepositInput{
			Id:                          paymentId,
			AccountTransactionId:        input.AccountTransactionId,
			SourceAccountId:             input.SourceAccountId,
			DestinationClubId:           input.DestinationClubId,
			Amount:                      input.Amount,
			Currency:                    input.Currency,
			Timestamp:                   input.Timestamp,
			IsClubSupporterSubscription: input.IsClubSupporterSubscription,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	var pendingPayment *activities.GetClubPaymentDetailsPayload

	// get payment details to be used in the next workflows
	if err := workflow.ExecuteActivity(ctx, a.GetClubPaymentDetails,
		paymentId,
	).Get(ctx, nil); err != nil {
		return err
	}

	// add to the club's pending balance, so they can see it
	if err := workflow.ExecuteActivity(ctx, a.AddToClubPendingBalance,
		activities.AddToClubPendingBalanceInput{
			PaymentId: paymentId,
			ClubId:    input.DestinationClubId,
			Currency:  pendingPayment.Currency,
			Amount:    pendingPayment.FinalAmount,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// wait until settlement date to settle the payment
	if err := workflow.Sleep(ctx, pendingPayment.SettlementDate.Sub(workflow.Now(ctx))); err != nil {
		return err
	}

	// update the payment to be ready for a payout
	if err := workflow.ExecuteActivity(ctx, a.MakeClubPaymentReadyForPayout,
		activities.MakeClubPaymentReadyForPayout{
			PaymentId: paymentId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.SubtractFromClubBalance,
		activities.SubtractFromBalanceInput{
			PaymentId: paymentId,
			ClubId:    input.DestinationClubId,
			Currency:  pendingPayment.Currency,
			Amount:    pendingPayment.FinalAmount,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// add to the club's balance - this is the actual balance that will be paid out
	if err := workflow.ExecuteActivity(ctx, a.AddToClubBalance,
		activities.AddToClubBalanceInput{
			PaymentId: paymentId,
			ClubId:    input.DestinationClubId,
			Currency:  pendingPayment.Currency,
			Amount:    pendingPayment.FinalAmount,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
