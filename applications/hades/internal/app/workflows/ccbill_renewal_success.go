package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"overdoll/applications/hades/internal/domain/ccbill"
	"strings"
)

type CCBillRenewalSuccessInput struct {
	TransactionId          string `json:"transactionId"`
	SubscriptionId         string `json:"subscriptionId"`
	ClientAccnum           string `json:"clientAccnum"`
	ClientSubacc           string `json:"clientSubacc"`
	Timestamp              string `json:"timestamp"`
	BilledCurrency         string `json:"billedCurrency"`
	BilledCurrencyCode     string `json:"billedCurrencyCode"`
	BilledAmount           string `json:"billedAmount"`
	AccountingCurrency     string `json:"accountingCurrency"`
	AccountingCurrencyCode string `json:"accountingCurrencyCode"`
	AccountingAmount       string `json:"accountingAmount"`
	RenewalDate            string `json:"renewalDate"`
	NextRenewalDate        string `json:"nextRenewalDate"`
	PaymentAccount         string `json:"paymentAccount"`
	PaymentType            string `json:"paymentType"`
	CardType               string `json:"cardType"`
	Last4                  string `json:"last4"`
	ExpDate                string `json:"expDate"`
}

func CCBillRenewalSuccess(ctx workflow.Context, input CCBillRenewalSuccessInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, input.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	amount, err := ccbill.ParseCCBillCurrencyAmount(input.BilledAmount, input.BilledCurrency)

	if err != nil {
		return err
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return err
	}

	billedAtDate, err := ccbill.ParseCCBillDate(strings.Split(input.RenewalDate, " ")[0])

	if err != nil {
		return err
	}

	nextBillingDate, err := ccbill.ParseCCBillDate(input.NextRenewalDate)

	// create record for failed transaction
	if err := workflow.ExecuteActivity(ctx, a.CreateInvoiceClubSubscriptionAccountTransaction,
		activities.CreateInvoiceClubSubscriptionAccountTransactionInput{
			AccountClubSupporterSubscriptionId: input.SubscriptionId,
			AccountId:                          subscriptionDetails.AccountId,
			TransactionId:                      input.TransactionId,
			Timestamp:                          timestamp,
			CardLast4:                          input.Last4,
			CardType:                           input.CardType,
			CardExpirationDate:                 input.ExpDate,
			Amount:                             amount,
			Currency:                           input.BilledCurrency,
			BillingDate:                        billedAtDate,
			NextBillingDate:                    nextBillingDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// update to new billing date
	if err := workflow.ExecuteActivity(ctx, a.UpdateAccountClubSupportBillingDate,
		activities.UpdateAccountClubSupportBillingDateInput{
			AccountClubSupporterSubscriptionId: input.SubscriptionId,
			NextBillingDate:                    nextBillingDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	accountingAmount, err := ccbill.ParseCCBillCurrencyAmount(input.AccountingAmount, input.AccountingCurrency)

	if err != nil {
		return err
	}

	// send a payment
	if err := workflow.ExecuteActivity(ctx, a.NewClubSupporterSubscriptionPaymentDeposit,
		activities.NewClubSupporterSubscriptionPaymentDepositInput{
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
		WorkflowID:        "ClubTransactionMetric_" + input.TransactionId,
		ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
	})

	if err := workflow.ExecuteChildWorkflow(childCtx, ClubTransactionMetric,
		ClubTransactionMetricInput{
			ClubId:    subscriptionDetails.ClubId,
			Timestamp: timestamp,
			Id:        input.TransactionId,
			Amount:    accountingAmount,
			Currency:  input.AccountingCurrency,
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
