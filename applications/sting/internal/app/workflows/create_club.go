package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type CreateClubInput struct {
	ClubId         string
	Slug           string
	Name           string
	OwnerAccountId string
}

func CreateClub(ctx workflow.Context, input CreateClubInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	// actually create the club
	if err := workflow.ExecuteActivity(ctx, a.CreateClub,
		activities.CreateClubInput{
			ClubId:         input.ClubId,
			Slug:           input.Slug,
			Name:           input.Name,
			OwnerAccountId: input.OwnerAccountId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to create club", "Error", err)
		return err
	}

	return nil
}
