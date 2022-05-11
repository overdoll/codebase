package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"time"
)

type CCBillBillingDateChangeInput struct {
	SubscriptionId  string
	NextBillingDate time.Time
}

func CCBillBillingDateChange(ctx workflow.Context, input CCBillBillingDateChangeInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, input.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	if subscriptionDetails.Duplicate {
		return nil
	}

	// update to new billing date
	if err := workflow.ExecuteActivity(ctx, a.UpdateAccountClubSupportBillingDate,
		activities.UpdateAccountClubSupportBillingDateInput{
			AccountClubSupporterSubscriptionId: subscriptionDetails.AccountClubSupporterSubscriptionId,
			NextBillingDate:                    input.NextBillingDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
