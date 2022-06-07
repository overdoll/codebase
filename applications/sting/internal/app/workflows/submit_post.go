package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
	"time"

	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type SubmitPostInput struct {
	PostId   string
	PostDate time.Time
}

func SubmitPost(ctx workflow.Context, input SubmitPostInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.CreatePixelatedResourcesForSupporterOnlyContent,
		activities.CreatePixelatedResourcesForSupporterOnlyContentInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to create pixelated resources for supporter only content", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.SubmitPost,
		activities.SubmitPostInput{
			PostId:   input.PostId,
			PostDate: input.PostDate,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to submit post", "Error", err)
		return err
	}

	var inReview bool

	if err := workflow.ExecuteActivity(ctx, a.PutPostIntoModeratorQueueOrPublish,
		activities.PutPostIntoModeratorQueueOrPublishInput{
			PostId: input.PostId,
		},
	).Get(ctx, &inReview); err != nil {
		logger.Error("failed to put post into moderator queue or publish", "Error", err)
		return err
	}

	if inReview {
		if err := workflow.ExecuteActivity(ctx, a.ReviewPost,
			activities.ReviewPostInput{
				PostId: input.PostId,
			},
		).Get(ctx, nil); err != nil {
			logger.Error("failed to review post", "Error", err)
			return err
		}
	} else {

		childWorkflowOptions := workflow.ChildWorkflowOptions{
			WorkflowID:        "sting.PublishPost_" + input.PostId,
			ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
		}

		childCtx := workflow.WithChildOptions(ctx, childWorkflowOptions)

		if err := workflow.ExecuteChildWorkflow(childCtx, PublishPost,
			PublishPostInput{
				PostId: input.PostId,
			},
		).
			GetChildWorkflowExecution().
			Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
			logger.Error("failed to publish post", "Error", err)
			return err
		}
	}

	return nil
}
