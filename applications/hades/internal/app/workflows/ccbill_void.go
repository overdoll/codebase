package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type CCBillVoidPayload struct {
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

func CCBillVoid(ctx workflow.Context, payload CCBillVoidPayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, payload.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	// create void record
	if err := workflow.ExecuteActivity(ctx, a.CreateVoidClubSubscriptionAccountTransactionRecord,
		activities.CreateVoidClubSubscriptionAccountTransactionRecord{
			CCBillSubscriptionId: payload.SubscriptionId,
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			Timestamp:            payload.Timestamp,
			Currency:             payload.Currency,
			Amount:               payload.Amount,
			Reason:               payload.Reason,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}