package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/stella/internal/app/workflows/activities"
	"time"
)

type ClubSupporterPostNotificationsInput struct {
	ClubId     string
	FutureTime time.Time
}

func ClubSupporterPostNotifications(ctx workflow.Context, input ClubSupporterPostNotificationsInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	currentTime := workflow.Now(ctx)

	difference := input.FutureTime.Sub(currentTime)
	mostTimePassed := difference / 4 * 3
	dayBefore := time.Hour*24 - difference/4

	// wait until we are 3/4ths of the time there to send the notification
	if err := workflow.Sleep(ctx, mostTimePassed); err != nil {
		return err
	}

	// send a reminder to tell the club owner to post something
	if err := workflow.ExecuteActivity(ctx, a.ClubSupporterRequiredPostReminder,
		activities.ClubSupporterRequiredPostReminderInput{
			ClubId:         input.ClubId,
			DurationPassed: mostTimePassed,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// wait until day before to send a notification to us about the no post
	if err := workflow.Sleep(ctx, dayBefore); err != nil {
		return err
	}

	// tell us the day before the last day that this club hasn't posted anything
	if err := workflow.ExecuteActivity(ctx, a.ClubSupporterNoPosts,
		activities.ClubSupporterNoPostsInput{
			ClubId: input.ClubId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}