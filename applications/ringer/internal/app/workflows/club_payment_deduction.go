package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/ringer/internal/app/workflows/activities"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/money"
	"overdoll/libraries/support"
	"time"
)

type ClubPaymentDeductionInput struct {
	Source                      payment.Source
	AccountTransactionId        string
	SourceAccountId             string
	DestinationClubId           string
	Amount                      uint64
	Currency                    money.Currency
	Timestamp                   time.Time
	IsClubSupporterSubscription bool
}

func ClubPaymentDeduction(ctx workflow.Context, input ClubPaymentDeductionInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	uniqueId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	// create a pending deduction
	if err := workflow.ExecuteActivity(ctx, a.CreatePendingClubPaymentDeduction,
		activities.CreatePendingClubPaymentDeductionInput{
			Id:                          uniqueId,
			AccountTransactionId:        input.AccountTransactionId,
			SourceAccountId:             input.SourceAccountId,
			DestinationClubId:           input.DestinationClubId,
			Amount:                      input.Amount,
			Currency:                    input.Currency,
			Timestamp:                   input.Timestamp,
			IsClubSupporterSubscription: input.IsClubSupporterSubscription,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to create pending club payment deduction", "Error", err)
		return err
	}

	var pendingPayment *activities.GetClubPaymentDetailsPayload

	// get payment details to be used in the next workflows
	if err := workflow.ExecuteActivity(ctx, a.GetClubPaymentDetails,
		uniqueId,
	).Get(ctx, &pendingPayment); err != nil {
		logger.Error("failed to get club payment details", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.SubtractFromClubPendingBalance,
		activities.SubtractFromClubPendingBalanceInput{
			ClubId:   input.DestinationClubId,
			Currency: pendingPayment.Currency,
			Amount:   pendingPayment.FinalAmount,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to subtract from club pending balance", "Error", err)
		return err
	}

	// wait until settlement date to settle the payment
	if err := workflow.Sleep(ctx, pendingPayment.SettlementDate.Sub(workflow.Now(ctx))); err != nil {
		logger.Error("failed to sleep until settlement date", "Error", err)
		return err
	}

	// update the payment to be ready for a payout
	if err := workflow.ExecuteActivity(ctx, a.MakeClubPaymentReadyForPayout,
		activities.MakeClubPaymentReadyForPayout{
			PaymentId: uniqueId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to make club payment ready for payout", "Error", err)
		return err
	}

	// we remove our deduction from the pending balance
	if err := workflow.ExecuteActivity(ctx, a.AddToClubPendingBalance,
		activities.AddToClubPendingBalanceInput{
			ClubId:   input.DestinationClubId,
			Currency: pendingPayment.Currency,
			Amount:   pendingPayment.FinalAmount,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to add to club pending balance", "Error", err)
		return err
	}

	// subtract from the club's balance since this is a deduction
	if err := workflow.ExecuteActivity(ctx, a.SubtractFromClubBalance,
		activities.SubtractFromBalanceInput{
			ClubId:   input.DestinationClubId,
			Currency: pendingPayment.Currency,
			Amount:   pendingPayment.FinalAmount,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to subtract from club balance", "Error", err)
		return err
	}

	return nil
}
