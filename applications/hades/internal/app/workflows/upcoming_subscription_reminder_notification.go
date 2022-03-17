package workflows

import (
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type UpcomingSubscriptionReminderNotificationInput struct {
	AccountId string
}

func UpcomingSubscriptionReminderNotification(ctx workflow.Context, input UpcomingSubscriptionReminderNotificationInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var sendUpcomingNotificationResponse *activities.SendUpcomingSubscriptionReminderNotificationResponse

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.SendUpcomingSubscriptionReminderNotification,
		&activities.SendUpcomingSubscriptionReminderNotificationInput{
			AccountId: input.AccountId,
		},
	).Get(ctx, &sendUpcomingNotificationResponse); err != nil {
		return err
	}

	// no subscriptions left, or all active subscriptions have been cancelled by our account, so we don't send the notifications any longer
	if sendUpcomingNotificationResponse.NoActiveSubscriptions {
		// send a cancelled error to signal the cron to stop
		return temporal.NewCanceledError()
	}

	return nil
}
