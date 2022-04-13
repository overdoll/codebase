package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type CCBillVoidInput struct {
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
}

func CCBillVoid(ctx workflow.Context, input CCBillVoidInput) error {

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

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return err
	}

	// update void - mark subscription as voided
	if err := workflow.ExecuteActivity(ctx, a.UpdateVoidClubSubscriptionAccountTransaction,
		activities.UpdateVoidClubSubscriptionAccountTransactionInput{
			TransactionId: input.TransactionId,
			Timestamp:     timestamp,
			Reason:        input.Reason,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	accountingAmount, err := ccbill.ParseCCBillCurrencyAmount(input.AccountingAmount, input.AccountingCurrency)

	if err != nil {
		return err
	}

	// send a payment indicating a deduction for this club
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

	return nil
}
