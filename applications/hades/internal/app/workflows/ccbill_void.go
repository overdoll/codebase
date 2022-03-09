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

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return err
	}

	var amount int64

	if input.Amount != "" {
		amt, err := ccbill.ParseCCBillCurrencyAmount(input.Amount, input.Currency)

		if err != nil {
			return err
		}

		amount = amt
	}

	// create void record
	if err := workflow.ExecuteActivity(ctx, a.CreateVoidClubSubscriptionAccountTransactionRecord,
		activities.CreateVoidClubSubscriptionAccountTransactionRecordInput{
			CCBillSubscriptionId: &input.SubscriptionId,
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			Timestamp:            timestamp,
			Reason:               input.Reason,
			Amount:               amount,
			Currency:             input.Currency,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
