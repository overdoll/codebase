package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type CCBillChargebackInput struct {
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

func CCBillChargeback(ctx workflow.Context, input CCBillChargebackInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, input.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return err
	}

	amount, err := ccbill.ParseCCBillCurrencyAmount(input.Amount, input.Currency)

	if err != nil {
		return err
	}

	// create chargeback record
	if err := workflow.ExecuteActivity(ctx, a.UpdateChargebackClubSubscriptionAccountTransaction,
		activities.UpdateChargebackClubSubscriptionAccountTransactionRecordInput{
			TransactionId: input.TransactionId,
			Timestamp:     timestamp,
			Currency:      input.Currency,
			Amount:        amount,
			Reason:        input.Reason,
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

	return nil
}
