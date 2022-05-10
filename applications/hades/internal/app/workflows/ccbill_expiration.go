package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"overdoll/applications/hades/internal/domain/ccbill"
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

	// ignore duplicate subscription
	if subscriptionDetails.Duplicate {
		return nil
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return err
	}

	// expire the club supporter subscription
	if err := workflow.ExecuteActivity(ctx, a.ExpireAccountClubSupportSubscription,
		activities.ExpireAccountClubSupportSubscriptionInput{
			AccountClubSupporterSubscriptionId: subscriptionDetails.AccountClubSupporterSubscriptionId,
			ExpiredAt:                          timestamp,
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
