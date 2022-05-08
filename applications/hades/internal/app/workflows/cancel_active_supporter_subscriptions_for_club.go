package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type CancelActiveSupporterSubscriptionsForClubInput struct {
	ClubId string
}

func CancelActiveSupporterSubscriptionsForClub(ctx workflow.Context, input CancelActiveSupporterSubscriptionsForClubInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var payload *activities.GetActiveClubSupporterSubscriptionsForClubPayload

	// get all active subscriptions for club
	if err := workflow.ExecuteActivity(ctx, a.GetActiveClubSupporterSubscriptionsForClub,
		activities.GetActiveClubSupporterSubscriptionsForClubInput{
			ClubId: input.ClubId,
		},
	).Get(ctx, &payload); err != nil {
		return err
	}

	// cancel all subscriptions 1 by 1
	for _, id := range payload.SubscriptionIds {
		if err := workflow.ExecuteActivity(ctx, a.CancelClubSupporterSubscription,
			activities.CancelClubSupporterSubscriptionInput{
				Id: id,
			},
		).Get(ctx, nil); err != nil {
			return err
		}
	}

	return nil
}
