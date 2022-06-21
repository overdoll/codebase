package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"overdoll/libraries/money"
	"overdoll/libraries/support"
	"time"
)

type CCBillRefundInput struct {
	TransactionId      string
	SubscriptionId     string
	Timestamp          time.Time
	Currency           money.Currency
	Amount             uint64
	AccountingCurrency money.Currency
	AccountingAmount   uint64
	Reason             string
	CardType           string
	Last4              string
	ExpDate            string
}

func CCBillRefund(ctx workflow.Context, input CCBillRefundInput) error {

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

	uniqueId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	// create refund record
	if err := workflow.ExecuteActivity(ctx, a.UpdateRefundClubSubscriptionAccountTransaction,
		activities.UpdateRefundClubSubscriptionAccountTransactionInput{
			Id:                   uniqueId,
			AccountTransactionId: transactionDetails.TransactionId,
			Timestamp:            input.Timestamp,
			Currency:             input.Currency,
			Amount:               input.Amount,
			Reason:               input.Reason,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to update transaction refunded", "Error", err)
		return err
	}

	// send cancellation notification
	if err := workflow.ExecuteActivity(ctx, a.SendAccountClubSupporterSubscriptionRefundNotification,
		activities.SendAccountClubSupporterSubscriptionRefundNotificationInput{
			AccountClubSupporterSubscriptionId: subscriptionDetails.AccountClubSupporterSubscriptionId,
			AccountTransactionId:               transactionDetails.TransactionId,
			Currency:                           input.Currency,
			Amount:                             input.Amount,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to send account club supporter subscription refund notification", "Error", err)
		return err
	}

	// send a payment
	if err := workflow.ExecuteActivity(ctx, a.NewClubSupporterSubscriptionPaymentDeduction,
		activities.NewClubSupporterSubscriptionPaymentDeductionInput{
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			AccountTransactionId: transactionDetails.TransactionId,
			IdempotencyKey:       uniqueId,
			Timestamp:            input.Timestamp,
			Amount:               input.Amount,
			Currency:             input.Currency,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to create new payment deduction", "Error", err)
		return err
	}

	// spawn a child workflow that will calculate club transaction metrics
	childCtx := workflow.WithChildOptions(ctx, workflow.ChildWorkflowOptions{
		WorkflowID:        "hades.ClubTransactionMetric_" + uniqueId,
		ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
	})

	if err := workflow.ExecuteChildWorkflow(childCtx, ClubTransactionMetric,
		ClubTransactionMetricInput{
			ClubId:    subscriptionDetails.ClubId,
			Timestamp: input.Timestamp,
			Id:        uniqueId,
			Amount:    input.Amount,
			Currency:  input.Currency,
			IsRefund:  true,
		},
	).
		GetChildWorkflowExecution().
		Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
		logger.Error("failed to create new payment deduction", "Error", err)
		return err
	}

	return nil
}
