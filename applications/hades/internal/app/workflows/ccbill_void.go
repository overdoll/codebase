package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/money"
	"strconv"
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

	// get details of the transaction, so we know the original id
	var transactionDetails *activities.GetCCBillTransactionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillTransactionDetails, input.TransactionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return err
	}

	// update void - mark subscription as voided
	if err := workflow.ExecuteActivity(ctx, a.UpdateVoidClubSubscriptionAccountTransaction,
		activities.UpdateVoidClubSubscriptionAccountTransactionInput{
			AccountTransactionId: transactionDetails.TransactionId,
			Timestamp:            timestamp,
			Reason:               input.Reason,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	currency := input.AccountingCurrency

	if currency == "" {
		currency = subscriptionDetails.Currency.String()
	}

	amount := input.AccountingAmount

	if amount == "" {
		amount = strconv.Itoa(int(subscriptionDetails.Amount))
	}

	accountingAmount, err := ccbill.ParseCCBillCurrencyAmount(amount, currency)

	if err != nil {
		return err
	}

	accountingCurrency, err := money.CurrencyFromString(currency)

	if err != nil {
		return err
	}

	// send a payment indicating a deduction for this club
	if err := workflow.ExecuteActivity(ctx, a.NewClubSupporterSubscriptionPaymentDeduction,
		activities.NewClubSupporterSubscriptionPaymentDeductionInput{
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			AccountTransactionId: transactionDetails.TransactionId,
			Timestamp:            timestamp,
			Amount:               accountingAmount,
			Currency:             accountingCurrency,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
