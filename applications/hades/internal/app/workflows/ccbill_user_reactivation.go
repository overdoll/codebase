package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"time"
)

type CCBillUserReactivationInput struct {
	TransactionId   string
	SubscriptionId  string
	NextBillingDate time.Time
}

func CCBillUserReactivation(ctx workflow.Context, input CCBillUserReactivationInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, input.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	// ignore duplicate subscriptions
	if subscriptionDetails.Duplicate {
		return nil
	}

	// update supporter status to display the new reactivation
	if err := workflow.ExecuteActivity(ctx, a.MarkAccountClubSupporterSubscriptionReactivated,
		activities.MarkAccountClubSupporterSubscriptionReactivatedInput{
			AccountClubSupporterSubscriptionId: subscriptionDetails.AccountClubSupporterSubscriptionId,
			NextBillingDate:                    input.NextBillingDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
