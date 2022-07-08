package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type GenerateClubBannerFromPostInput struct {
	PostId string
}

func GenerateClubBannerFromPost(ctx workflow.Context, input GenerateClubBannerFromPostInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.UpdateClubBanner,
		activities.UpdateClubBannerInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to update club banner", "Error", err)
		return err
	}

	return nil
}
