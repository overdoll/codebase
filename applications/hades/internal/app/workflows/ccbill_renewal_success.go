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

type CCBillRenewalSuccessInput struct {
	TransactionId      string
	SubscriptionId     string
	Timestamp          time.Time
	BilledCurrency     money.Currency
	BilledAmount       uint64
	AccountingCurrency money.Currency
	AccountingAmount   uint64
	BilledAtDate       time.Time
	NextBillingDate    time.Time
	CardType           string
	Last4              string
	ExpDate            string
}

func CCBillRenewalSuccess(ctx workflow.Context, input CCBillRenewalSuccessInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, input.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		logger.Error("failed to get ccbill subscription details", "Error", err)
		return err
	}

	uniqueTransactionId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	// create record for failed transaction
	if err := workflow.ExecuteActivity(ctx, a.CreateInvoiceClubSubscriptionAccountTransaction,
		activities.CreateInvoiceClubSubscriptionAccountTransactionInput{
			Id:                                 uniqueTransactionId,
			AccountClubSupporterSubscriptionId: subscriptionDetails.AccountClubSupporterSubscriptionId,
			AccountId:                          subscriptionDetails.AccountId,
			CCBillTransactionId:                input.TransactionId,
			Timestamp:                          input.Timestamp,
			CardLast4:                          input.Last4,
			CardType:                           input.CardType,
			CardExpirationDate:                 input.ExpDate,
			Amount:                             input.BilledAmount,
			Currency:                           input.BilledCurrency,
			BillingDate:                        input.BilledAtDate,
			NextBillingDate:                    input.NextBillingDate,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to create invoice club supporter subscription account transaction", "Error", err)
		return err
	}

	// update to new billing date
	if err := workflow.ExecuteActivity(ctx, a.UpdateAccountClubSupporterBillingDate,
		activities.UpdateAccountClubSupporterBillingDateInput{
			AccountClubSupporterSubscriptionId: subscriptionDetails.AccountClubSupporterSubscriptionId,
			NextBillingDate:                    input.NextBillingDate,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to update account club supporter subscription billing date", "Error", err)
		return err
	}

	// send a payment
	if err := workflow.ExecuteActivity(ctx, a.NewClubSupporterSubscriptionPaymentDeposit,
		activities.NewClubSupporterSubscriptionPaymentDepositInput{
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			AccountTransactionId: uniqueTransactionId,
      IdempotencyKey:       uniqueTransactionId,
      Timestamp:            input.Timestamp,
			Amount:               input.AccountingAmount,
			Currency:             input.AccountingCurrency,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to create new club supporter subscription payment deposit", "Error", err)
		return err
	}

	// spawn a child workflow that will calculate club transaction metrics
	childCtx := workflow.WithChildOptions(ctx, workflow.ChildWorkflowOptions{
		WorkflowID:        "hades.ClubTransactionMetric_" + uniqueTransactionId,
		ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
	})

	if err := workflow.ExecuteChildWorkflow(childCtx, ClubTransactionMetric,
		ClubTransactionMetricInput{
			ClubId:    subscriptionDetails.ClubId,
			Timestamp: input.Timestamp,
			Id:        uniqueTransactionId,
			Amount:    input.AccountingAmount,
			Currency:  input.AccountingCurrency,
		},
	).
		GetChildWorkflowExecution().
		Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
		logger.Error("failed to create club transaction metric", "Error", err)
		return err
	}

	return nil
}
