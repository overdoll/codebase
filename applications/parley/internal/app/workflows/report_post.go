package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/parley/internal/app/workflows/activities"
	"time"
)

type ReportPostInput struct {
	AccountId string
	PostId    string
	RuleId    string
	CreatedAt time.Time
}

func ReportPost(ctx workflow.Context, input ReportPostInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.CreatePostReport,
		activities.CreatePostReportInput{
			AccountId: input.AccountId,
			PostId:    input.PostId,
			RuleId:    input.RuleId,
			CreatedAt: input.CreatedAt,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to create post report", "Error", err)
		return err
	}

	return nil
}
