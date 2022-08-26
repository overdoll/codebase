package workflows

import (
	"errors"
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
	"time"

	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type SubmitPostInput struct {
	PostId   string
	PostDate *time.Time
}

const SubmitPostPixelatedResourcesSignalChannel = "submit-post-pixelated-resources"
const SubmitPostResourcesFinishedProcessingSignalChannel = "submit-post-resources-finish-processing"
const SubmitPostSignalChannel = "submit-post"

type SubmitPostResourceFinished struct {
	ResourceId string
	Failed     bool
}

func SubmitPost(ctx workflow.Context, input SubmitPostInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	var pixelatedResourcesCompleted bool
	var postDate *time.Time
	var hasFailed bool
	var resources []SubmitPostResourceFinished

	postPixelatedSelector := workflow.NewSelector(ctx)

	// here we wait until pixelated resources were called with a callback - since we need to wait for them to generate
	postPixelatedSelector.AddReceive(workflow.GetSignalChannel(ctx, SubmitPostPixelatedResourcesSignalChannel), func(channel workflow.ReceiveChannel, more bool) {
		channel.Receive(ctx, &pixelatedResourcesCompleted)
	})

	postSubmissionSelector := workflow.NewSelector(ctx)

	// wait for post to be submitted
	postSubmissionSelector.AddReceive(workflow.GetSignalChannel(ctx, SubmitPostSignalChannel), func(channel workflow.ReceiveChannel, more bool) {
		channel.Receive(ctx, &postDate)
	})

	postResourceProcessingSelector := workflow.NewSelector(ctx)

	postResourcesProcessingChannel := workflow.GetSignalChannel(ctx, SubmitPostResourcesFinishedProcessingSignalChannel)

	// wait for resources to finish processing
	postResourceProcessingSelector.AddReceive(postResourcesProcessingChannel, func(channel workflow.ReceiveChannel, more bool) {
		var receivedPayload SubmitPostResourceFinished
		for channel.ReceiveAsync(&receivedPayload) {
			resources = append(resources, receivedPayload)
		}
	})

	// wait for post to be "submitted"
	postSubmissionSelector.Select(ctx)

	if postDate == nil {
		postDate = input.PostDate
	}

	var postDetails *activities.SubmitPostPayload

	// update post status
	if err := workflow.ExecuteActivity(ctx, a.SubmitPost,
		activities.SubmitPostInput{
			PostId:   input.PostId,
			PostDate: *postDate,
		},
	).Get(ctx, &postDetails); err != nil {
		logger.Error("failed to submit post", "Error", err)
		return err
	}

	// wait for at least 1 resource to finish processing
	// only block if we are waiting for at least 1 resource
	if len(postDetails.ResourceIds) > 0 {
		postResourceProcessingSelector.Select(ctx)
	}

	// check our signal channels to see if we have a failed resource waiting
	var receivedPayload SubmitPostResourceFinished
	for postResourcesProcessingChannel.ReceiveAsync(&receivedPayload) {
		resources = append(resources, receivedPayload)
	}

	for _, resourceId := range postDetails.ResourceIds {
		for _, resource := range resources {
			// check for a failed resource
			if resourceId == resource.ResourceId {
				if resource.Failed {
					hasFailed = true
					break
				}
			}
		}
	}

	if hasFailed {
		if err := workflow.ExecuteActivity(ctx, a.SendPostFailedProcessingNotification,
			activities.SendPostFailedProcessingNotificationInput{
				PostId: input.PostId,
			},
		).Get(ctx, nil); err != nil {
			logger.Error("failed to send post failed processing notification", "Error", err)
			return err
		}

		// continue workflow as new to restart the flow since we submitted a post with errors
		return workflow.NewContinueAsNewError(ctx, SubmitPost, SubmitPostInput{
			PostId:   input.PostId,
			PostDate: postDate,
		})
	}

	// check for a condition
	// we receive all IDs that are processed, and then compare them against the post's actual IDs
	// if we find all IDs then the post has finished processing
	if err := workflow.Await(ctx, func() bool {

		var finds int

		var receivedPayload SubmitPostResourceFinished
		for postResourcesProcessingChannel.ReceiveAsync(&receivedPayload) {
			resources = append(resources, receivedPayload)
		}

		for _, resourceId := range postDetails.ResourceIds {
			for _, resource := range resources {
				// check for a failed resource
				if resourceId == resource.ResourceId {
					if !resource.Failed {
						finds++
						break
					}
				}
			}
		}

		return finds >= len(postDetails.ResourceIds)
	}); err != nil {
		logger.Error("failed to await condition", "Error", err)
		return err
	}

	var createdPayload *activities.CreatePixelatedResourcesForSupporterOnlyContentPayload

	if err := workflow.ExecuteActivity(ctx, a.CreatePixelatedResourcesForSupporterOnlyContent,
		activities.CreatePixelatedResourcesForSupporterOnlyContentInput{
			PostId: input.PostId,
		},
	).Get(ctx, &createdPayload); err != nil {
		logger.Error("failed to create pixelated resources for supporter only content", "Error", err)
		return err
	}

	// only wait for postPixelatedSelector if we have created pixelated resources
	if createdPayload.CreatedResources {
		postPixelatedSelector.Select(ctx)
		if !pixelatedResourcesCompleted {
			return errors.New("pixelated resources not yet completed")
		}
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
