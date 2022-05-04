package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/support"
)

type CCBillRefundInput struct {
	TransactionId          string `json:"transactionId"`
	SubscriptionId         string `json:"subscriptionId"`
	ClientAccnum           string `json:"clientAccnum"`
	ClientSubacc           string `json:"clientSubacc"`
	Timestamp              string `json:"timestamp"`
	Currency               string `json:"currency"`
	CurrencyCode           string `json:"currencyCode"`
	Amount                 string `json:"amount"`
	AccountingCurrency     string `json:"accountingCurrency"`
	AccountingCurrencyCode string `json:"accountingCurrencyCode"`
	AccountingAmount       string `json:"accountingAmount"`
	Reason                 string `json:"reason"`
	CardType               string `json:"cardType"`
	PaymentAccount         string `json:"paymentAccount"`
	PaymentType            string `json:"paymentType"`
	Last4                  string `json:"last4"`
	ExpDate                string `json:"expDate"`
}

func CCBillRefund(ctx workflow.Context, input CCBillRefundInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, input.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	// ignore duplicate subscription
	if subscriptionDetails.Duplicate {
		return nil
	}

	amount, err := ccbill.ParseCCBillCurrencyAmount(input.Amount, input.Currency)

	if err != nil {
		return err
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return err
	}

	uniqueId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	// create refund record
	if err := workflow.ExecuteActivity(ctx, a.UpdateRefundClubSubscriptionAccountTransaction,
		activities.UpdateRefundClubSubscriptionAccountTransactionInput{
			Id:            *uniqueId,
			TransactionId: input.TransactionId,
			Timestamp:     timestamp,
			Currency:      input.Currency,
			Amount:        amount,
			Reason:        input.Reason,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// send cancellation notification
	if err := workflow.ExecuteActivity(ctx, a.SendAccountClubSupporterSubscriptionRefundNotification,
		activities.SendAccountClubSupporterSubscriptionRefundNotificationInput{
			SubscriptionId: input.SubscriptionId,
			TransactionId:  input.TransactionId,
			Currency:       input.Currency,
			Amount:         amount,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	accountingAmount, err := ccbill.ParseCCBillCurrencyAmount(input.AccountingAmount, input.AccountingCurrency)

	if err != nil {
		return err
	}

	// send a payment
	if err := workflow.ExecuteActivity(ctx, a.NewClubSupporterSubscriptionPaymentDeduction,
		activities.NewClubSupporterSubscriptionPaymentDeductionInput{
			AccountId:     subscriptionDetails.AccountId,
			ClubId:        subscriptionDetails.ClubId,
			TransactionId: input.TransactionId,
			Timestamp:     timestamp,
			Amount:        accountingAmount,
			Currency:      input.AccountingCurrency,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// spawn a child workflow that will calculate club transaction metrics
	childCtx := workflow.WithChildOptions(ctx, workflow.ChildWorkflowOptions{
		WorkflowID:        "ClubTransactionMetric_" + *uniqueId,
		ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
	})

	if err := workflow.ExecuteChildWorkflow(childCtx, ClubTransactionMetric,
		ClubTransactionMetricInput{
			ClubId:    subscriptionDetails.ClubId,
			Timestamp: timestamp,
			Id:        *uniqueId,
			Amount:    accountingAmount,
			Currency:  input.AccountingCurrency,
			IsRefund:  true,
		},
	).
		GetChildWorkflowExecution().
		Get(childCtx, nil); err != nil {
		// ignore already started errors
		if temporal.IsWorkflowExecutionAlreadyStartedError(err) {
			return nil
		}
		return err
	}

	return nil
}
