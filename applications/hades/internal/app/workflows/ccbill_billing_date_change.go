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
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, input.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		logger.Error("failed to get ccbill subscription details", "Error", err)
		return err
	}

	if subscriptionDetails.Duplicate {
		return nil
	}

	// update to new billing date
	if err := workflow.ExecuteActivity(ctx, a.UpdateAccountClubSupporterBillingDate,
		activities.UpdateAccountClubSupporterBillingDateInput{
			AccountClubSupporterSubscriptionId: subscriptionDetails.AccountClubSupporterSubscriptionId,
			NextBillingDate:                    input.NextBillingDate,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to update account club support billing date", "Error", err)
		return err
	}

	return nil
}
