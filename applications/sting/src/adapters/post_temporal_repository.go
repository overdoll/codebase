package adapters

import (
	"context"
	"time"

	"github.com/google/uuid"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/src/domain/post"
)

var options = workflow.ActivityOptions{
	// Timeout options specify when to automatically timeout Actvitivy functions.
	StartToCloseTimeout: time.Minute,
	// Optionally provide a customized RetryPolicy.
	// Temporal retries failures by default, this is just an example.
	RetryPolicy: &temporal.RetryPolicy{
		InitialInterval:    time.Second,
		BackoffCoefficient: 2.0,
		MaximumInterval:    time.Minute,
		MaximumAttempts:    500,
	},
}

type PostTemporalRepository struct {
	client client.Client
}

func NewPostTemporalRepository(client client.Client) PostTemporalRepository {
	return PostTemporalRepository{client: client}
}

func (r PostTemporalRepository) CreatePostEvent(ctx context.Context, pendingPost *post.PostPending) error {

	options := client.StartWorkflowOptions{
		TaskQueue: "sting",
		ID:        "NewPendingPostWorkflow_" + uuid.New().String(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, StartPost, pendingPost.ID())

	if err != nil {
		return err
	}

	return nil
}

func StartPost(ctx workflow.Context, id string) error {
	ctx = workflow.WithActivityOptions(ctx, options)

	if err := workflow.ExecuteActivity(ctx, "NewPostActivityHandler.Handle", id).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}

func (r PostTemporalRepository) ReviewPostEvent(ctx context.Context, pendingPost *post.PostPending) error {

	options := client.StartWorkflowOptions{
		TaskQueue: "sting",
		ID:        "NewReviewPostWorkflow_" + uuid.New().String(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, ReviewPost, pendingPost.ID())

	if err != nil {
		return err
	}

	return nil
}

func ReviewPost(ctx workflow.Context, id string) error {
	ctx = workflow.WithActivityOptions(ctx, options)

	if err := workflow.ExecuteActivity(ctx, "ReviewPostActivityHandler.Handle", id).Get(ctx, nil); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, "PostCustomResourcesActivityHandler.Handle", id).Get(ctx, nil); err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, "PublishPostActivityHandler.Handle", id).Get(ctx, nil); err != nil {
		return err
	}

	return workflow.ExecuteActivity(ctx, "CreatePostActivityHandler.Handle", id).Get(ctx, nil)
}
