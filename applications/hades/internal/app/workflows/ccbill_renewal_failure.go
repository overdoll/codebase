package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"time"
)

type CCBillRenewalFailureInput struct {
	TransactionId  string
	SubscriptionId string
	Timestamp      time.Time
	NextRetryDate  time.Time
	FailureReason  string
	FailureCode    string
}

func CCBillRenewalFailure(ctx workflow.Context, input CCBillRenewalFailureInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, input.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		logger.Error("failed to get ccbill subscription details", "Error", err)
		return err
	}

	// update to new billing date
	if err := workflow.ExecuteActivity(ctx, a.UpdateAccountClubSupporterSubscriptionCCBillFailure,
		activities.UpdateAccountClubSupporterSubscriptionCCBillFailureInput{
			AccountClubSupporterSubscriptionId: subscriptionDetails.AccountClubSupporterSubscriptionId,
			Timestamp:                          input.Timestamp,
			CCBillErrorText:                    input.FailureReason,
			CCBillErrorCode:                    input.FailureCode,
			NextRetryDate:                      input.NextRetryDate,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to update account club supporter subscription ccbill failure", "Error", err)
		return err
	}

	// send failure notification
	if err := workflow.ExecuteActivity(ctx, a.SendAccountClubSupporterSubscriptionFailureNotification,
		activities.SendAccountClubSupporterSubscriptionFailureNotificationInput{
			AccountClubSupporterSubscriptionId: subscriptionDetails.AccountClubSupporterSubscriptionId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to send account club supporter subscription failure notification", "Error", err)
		return err
	}

	return nil
}
