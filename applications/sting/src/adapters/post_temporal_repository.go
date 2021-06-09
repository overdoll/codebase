package adapters

import (
	"context"
	"time"

	"github.com/segmentio/ksuid"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/sting/src/domain/post"
)

var options = workflow.ActivityOptions{
	// Timeout options specify when to automatically timeout Activity functions.
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

func (r PostTemporalRepository) CreatePostWorkflow(ctx context.Context, pendingPost *post.PostPending) error {

	options := client.StartWorkflowOptions{
		TaskQueue: "sting",
		ID:        "NewCreatePendingPostWorkflow_" + pendingPost.ID(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, CreatePost, pendingPost.ID())

	if err != nil {
		return err
	}

	return nil
}

func CreatePost(ctx workflow.Context, id string) error {
	ctx = workflow.WithActivityOptions(ctx, options)

	if err := workflow.ExecuteActivity(ctx, "NewPostActivityHandler.Handle", id).Get(ctx, nil); err != nil {
		return err
	}

	// reassign moderator every day
	for true {
		if err := workflow.Await(ctx, func() bool {
			return workflow.Now(ctx).After(time.Now().AddDate(0, 0, 1))
		}); err != nil {
			return err
		}

		newId := workflow.SideEffect(ctx, func(ctx workflow.Context) interface{} {
			return ksuid.New().String()
		})

		var requiresNewModerator bool

		err := workflow.ExecuteActivity(ctx, "ReassignModeratorActivityHandler.Handle", id, newId).Get(ctx, &requiresNewModerator)

		if err != nil {
			return err
		}

		if !requiresNewModerator {
			break
		}
	}

	return nil
}

func (r PostTemporalRepository) PublishPostWorkflow(ctx context.Context, pendingPost *post.PostPending) error {

	options := client.StartWorkflowOptions{
		TaskQueue: "sting",
		ID:        "NewPublishPostWorkflow_" + pendingPost.ID(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, PublishPost, pendingPost.ID())

	if err != nil {
		return err
	}

	return nil
}

func PublishPost(ctx workflow.Context, id string) error {
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

func (r PostTemporalRepository) DiscardPostWorkflow(ctx context.Context, pendingPost *post.PostPending) error {

	options := client.StartWorkflowOptions{
		TaskQueue: "sting",
		ID:        "NewDiscardPostWorkflow_" + pendingPost.ID(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, DiscardPost, pendingPost.ID())

	if err != nil {
		return err
	}

	return nil
}

func DiscardPost(ctx workflow.Context, id string) error {
	ctx = workflow.WithActivityOptions(ctx, options)
	return workflow.ExecuteActivity(ctx, "DiscardPostActivityHandler.Handle", id).Get(ctx, nil)
}

func (r PostTemporalRepository) UndoPostWorkflow(ctx context.Context, pendingPost *post.PostPending) error {

	options := client.StartWorkflowOptions{
		TaskQueue: "sting",
		ID:        "NewUndoPostWorkflow_" + pendingPost.ID(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, UndoPost, pendingPost.ID())

	if err != nil {
		return err
	}

	return nil
}

func UndoPost(ctx workflow.Context, id string) error {
	ctx = workflow.WithActivityOptions(ctx, options)

	return workflow.ExecuteActivity(ctx, "UndoPostActivityHandler.Handle", id).Get(ctx, nil)
}
