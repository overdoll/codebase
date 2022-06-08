package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/parley/internal/app/workflows/activities"
	"overdoll/libraries/support"
	"time"
)

type ApprovePostInput struct {
	ApprovedAt time.Time
	AccountId  string
	PostId     string
}

func ApprovePost(ctx workflow.Context, input ApprovePostInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	auditLogId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.CreateApprovedPostAuditLog,
		activities.CreateApprovedPostAuditLogInput{
			AccountId:  input.AccountId,
			PostId:     input.PostId,
			Id:         auditLogId,
			ApprovedAt: input.ApprovedAt,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to create approved post audit log", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.PublishPost,
		activities.PublishPostInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to publish post", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.RemovePostFromModeratorQueue,
		activities.RemovePostFromModeratorQueueInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to remove post from moderator queue", "Error", err)
		return err
	}

	return nil
}
