package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type CCBillRefundPayload struct {
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

func CCBillRefund(ctx workflow.Context, payload CCBillRefundPayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, payload.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	// create refund record
	if err := workflow.ExecuteActivity(ctx, a.CreateRefundClubSubscriptionAccountTransactionRecord,
		activities.CreateRefundClubSubscriptionAccountTransactionRecord{
			CCBillSubscriptionId: payload.SubscriptionId,
			CCBillTransactionId:  payload.TransactionId,
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			Timestamp:            payload.Timestamp,
			Currency:             payload.Currency,
			Amount:               payload.Amount,
			Reason:               payload.Reason,
			CardLast4:            payload.Last4,
			CardType:             payload.CardType,
			CardExpirationDate:   payload.ExpDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// remove account club support
	if err := workflow.ExecuteActivity(ctx, a.RemoveAccountClubSupportSubscription,
		activities.RemoveAccountClubSupportSubscription{
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			CCBillSubscriptionId: payload.SubscriptionId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// remove account club support - external
	if err := workflow.ExecuteActivity(ctx, a.RemoveClubSupporter,
		activities.RemoveClubSupporter{
			AccountId: subscriptionDetails.AccountId,
			ClubId:    subscriptionDetails.ClubId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
