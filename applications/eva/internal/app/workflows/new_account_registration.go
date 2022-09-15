package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/eva/internal/app/workflows/activities"
	"time"
)

type NewAccountRegistrationInput struct {
	AccountId string
}

func NewAccountRegistration(ctx workflow.Context, input NewAccountRegistrationInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	var timezone *activities.GetAccountLocalTimeZonePayload

	// get the local timezone of an account
	if err := workflow.ExecuteActivity(ctx, a.GetAccountLocalTimeZone,
		activities.GetAccountLocalTimeZoneInput{
			AccountId: input.AccountId,
		},
	).Get(ctx, &timezone); err != nil {
		logger.Error("failed to get account local time zone", "Error", err)
		return err
	}

	var location *time.Location

	if timezone.Timezone != "" {
		targetLocation, err := time.LoadLocation(timezone.Timezone)
		if err != nil {
			logger.Error("failed to load timezone", "Error", err)
		} else {
			location = targetLocation
		}
	}

	if location == nil {
		location, _ = time.LoadLocation("EST")
	}

	now := workflow.Now(ctx)

	yyyy, mm, dd := now.Date()
	tomorrow := time.Date(yyyy, mm, dd+1, 3, 0, 0, 0, location)

	// send email tomorrow at 3 am regardless of timezone
	if err := workflow.Sleep(ctx, tomorrow.Sub(now)); err != nil {
		return err
	}

	// adds the club member if it doesn't exist
	if err := workflow.ExecuteActivity(ctx, a.SendAccountNewRegistrationNotification,
		activities.SendAccountNewRegistrationNotificationInput{
			AccountId: input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to send new account registration notification", "Error", err)
		return err
	}

	return nil
}
