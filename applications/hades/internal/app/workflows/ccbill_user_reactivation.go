package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type CCBillUserReactivationInput struct {
	TransactionId   string `json:"transactionId"`
	SubscriptionId  string `json:"subscriptionId"`
	Price           string `json:"price"`
	ClientAccnum    string `json:"clientAccnum"`
	ClientSubacc    string `json:"clientSubacc"`
	Email           string `json:"email"`
	NextRenewalDate string `json:"nextRenewalDate"`
}

func CCBillUserReactivation(ctx workflow.Context, input CCBillUserReactivationInput) error {

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

	// create reactivated record
	if err := workflow.ExecuteActivity(ctx, a.CreateReactivatedClubSubscriptionAccountTransactionRecord,
		activities.CreateReactivatedClubSubscriptionAccountTransactionRecordInput{
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			CCBillSubscriptionId: &input.SubscriptionId,
			NextBillingDate:      nextBillingDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// update supporter status to display the new reactivation
	if err := workflow.ExecuteActivity(ctx, a.MarkAccountClubSupportReactivated,
		activities.MarkAccountClubSupportReactivatedInput{
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			CCBillSubscriptionId: &input.SubscriptionId,
			NextBillingDate:      nextBillingDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
