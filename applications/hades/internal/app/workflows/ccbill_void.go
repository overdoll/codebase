package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"time"
)

type CCBillVoidInput struct {
	TransactionId  string
	SubscriptionId string
	Timestamp      time.Time
	Reason         string
}

func CCBillVoid(ctx workflow.Context, input CCBillVoidInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, input.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		logger.Error("failed to get ccbill subscription details", "Error", err)
		return err
	}

	// ignore duplicate subscription
	if subscriptionDetails.Duplicate {
		return nil
	}

	// get details of the transaction, so we know the original id
	var transactionDetails *activities.GetCCBillTransactionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillTransactionDetails, input.TransactionId).Get(ctx, &transactionDetails); err != nil {
		logger.Error("failed to get ccbill transaction details", "Error", err)
		return err
	}

	// update void - mark subscription as voided
	if err := workflow.ExecuteActivity(ctx, a.UpdateVoidClubSubscriptionAccountTransaction,
		activities.UpdateVoidClubSubscriptionAccountTransactionInput{
			AccountTransactionId: transactionDetails.TransactionId,
			Timestamp:            input.Timestamp,
			Reason:               input.Reason,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to get ccbill subscription details", "Error", err)
		return err
	}

	// send a payment indicating a deduction for this club
	if err := workflow.ExecuteActivity(ctx, a.NewClubSupporterSubscriptionPaymentDeduction,
		activities.NewClubSupporterSubscriptionPaymentDeductionInput{
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			AccountTransactionId: transactionDetails.TransactionId,
			IdempotencyKey:       transactionDetails.TransactionId,
			Timestamp:            input.Timestamp,
			Amount:               subscriptionDetails.Amount,
			Currency:             subscriptionDetails.Currency,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to create new payment deduction", "Error", err)
		return err
	}

	return nil
}
