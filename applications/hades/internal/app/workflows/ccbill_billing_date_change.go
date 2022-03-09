package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type CCBillBillingDateChangeInput struct {
	SubscriptionId  string `json:"subscriptionId"`
	ClientAccnum    string `json:"clientAccnum"`
	ClientSubacc    string `json:"clientSubacc"`
	Timestamp       string `json:"timestamp"`
	NextRenewalDate string `json:"nextRenewalDate"`
}

func CCBillBillingDateChange(ctx workflow.Context, input CCBillBillingDateChangeInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, input.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	nextBillingDate, err := ccbill.ParseCCBillDate(input.NextRenewalDate)

	if err != nil {
		return err
	}

	// update to new billing date
	if err := workflow.ExecuteActivity(ctx, a.UpdateAccountClubSupportBillingDate,
		activities.UpdateAccountClubSupportBillingDateInput{
			CCBillSubscriptionId: &input.SubscriptionId,
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			NextBillingDate:      nextBillingDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
