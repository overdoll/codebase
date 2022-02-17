package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type CCBillUserReactivationPayload struct {
	TransactionId   string `json:"transactionId"`
	SubscriptionId  string `json:"subscriptionId"`
	Price           string `json:"price"`
	ClientAccnum    string `json:"clientAccnum"`
	ClientSubacc    string `json:"clientSubacc"`
	Timestamp       string `json:"timestamp"`
	Email           string `json:"email"`
	NextRenewalDate string `json:"nextRenewalDate"`
}

func CCBillUserReactivation(ctx workflow.Context, payload CCBillUserReactivationPayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, payload.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	// create reactivated record
	if err := workflow.ExecuteActivity(ctx, a.CreateReactivatedAccountTransactionRecord,
		activities.CreateReactivatedAccountTransactionRecord{
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			Timestamp:            payload.Timestamp,
			CCBillSubscriptionId: payload.SubscriptionId,
			CCBillTransactionId:  payload.TransactionId,
			NextBillingDate:      payload.NextRenewalDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// update supporter status to display the new reactivation
	if err := workflow.ExecuteActivity(ctx, a.MarkAccountClubSupportReactivated,
		activities.MarkAccountClubSupportReactivated{
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			CCBillSubscriptionId: payload.SubscriptionId,
			Timestamp:            payload.Timestamp,
			NextBillingDate:      payload.NextRenewalDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
