package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type CCBillExpirationInput struct {
	SubscriptionId string `json:"subscriptionId"`
	ClientAccnum   string `json:"clientAccnum"`
	ClientSubacc   string `json:"clientSubacc"`
	Timestamp      string `json:"timestamp"`
}

func CCBillExpiration(ctx workflow.Context, input CCBillExpirationInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, input.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	// create expired record
	if err := workflow.ExecuteActivity(ctx, a.CreateExpiredClubSubscriptionAccountTransactionRecord,
		activities.CreateExpiredClubSubscriptionAccountTransactionRecordInput{
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			CCBillSubscriptionId: input.SubscriptionId,
			Timestamp:            input.Timestamp,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// remove account club support
	if err := workflow.ExecuteActivity(ctx, a.RemoveAccountClubSupportSubscription,
		activities.RemoveAccountClubSupportSubscriptionInput{
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			CCBillSubscriptionId: input.SubscriptionId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// remove account club support - external
	if err := workflow.ExecuteActivity(ctx, a.RemoveClubSupporter,
		activities.RemoveClubSupporterInput{
			AccountId: subscriptionDetails.AccountId,
			ClubId:    subscriptionDetails.ClubId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
