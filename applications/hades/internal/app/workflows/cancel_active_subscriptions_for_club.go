package workflows

import (
	"go.temporal.io/sdk/workflow"
)

type CancelActiveSubscriptionsForClubInput struct {
	ClubId string
}

func CancelActiveSubscriptionsForClub(ctx workflow.Context, input CancelActiveSubscriptionsForClubInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	return nil
}
