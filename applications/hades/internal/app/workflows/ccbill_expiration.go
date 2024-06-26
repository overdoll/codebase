package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"time"
)

type CCBillExpirationInput struct {
	SubscriptionId string
	Timestamp      time.Time
}

func CCBillExpiration(ctx workflow.Context, input CCBillExpirationInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, input.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		logger.Error("failed to get ccbill subscription details", "Error", err)
		return err
	}

	// ignore duplicate subscription
	if subscriptionDetails.Duplicate {
		return nil
	}

	// expire the club supporter subscription
	if err := workflow.ExecuteActivity(ctx, a.ExpireAccountClubSupportSubscription,
		activities.ExpireAccountClubSupportSubscriptionInput{
			AccountClubSupporterSubscriptionId: subscriptionDetails.AccountClubSupporterSubscriptionId,
			ExpiredAt:                          input.Timestamp,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to expire account club supporter subscription", "Error", err)
		return err
	}

	// remove account club support - external
	if err := workflow.ExecuteActivity(ctx, a.RemoveClubSupporter,
		activities.RemoveClubSupporterInput{
			AccountId: subscriptionDetails.AccountId,
			ClubId:    subscriptionDetails.ClubId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to remove club supporter", "Error", err)
		return err
	}

	return nil
}
