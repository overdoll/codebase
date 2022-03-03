package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type CCBillExpirationPayload struct {
	SubscriptionId string `json:"subscriptionId"`
	ClientAccnum   string `json:"clientAccnum"`
	ClientSubacc   string `json:"clientSubacc"`
	Timestamp      string `json:"timestamp"`
}

func CCBillExpiration(ctx workflow.Context, payload CCBillExpirationPayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, payload.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	// create expired record
	if err := workflow.ExecuteActivity(ctx, a.CreateExpiredClubSubscriptionAccountTransactionRecord,
		activities.CreateExpiredClubSubscriptionAccountTransactionRecord{
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			CCBillSubscriptionId: payload.SubscriptionId,
			Timestamp:            payload.Timestamp,
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
