package adapters

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/internal/app/workflows"
)

type EventTemporalRepository struct {
	client client.Client
}

func NewEventTemporalRepository(client client.Client) EventTemporalRepository {
	return EventTemporalRepository{client: client}
}

func (r EventTemporalRepository) PublishPost(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "NewPublishPostWorkflow_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.PublishPost, postId)

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) DiscardPost(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "NewDiscardPostWorkflow_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.DiscardPost, postId)

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) DeletePost(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "NewDeletePostWorkflow_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.DeletePost, postId)

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) ArchivePost(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "NewArchivePostWorkflow_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.ArchivePost, postId)

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) RemovePost(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "NewRemovePostWorkflow_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.RemovePost, postId)

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) SubmitPost(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "SubmitPostWorkflow_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.SubmitPost, postId)

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) AddPostLike(ctx context.Context, postId, accountId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "AddPostLike_" + postId + "_" + accountId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.AddPostLike, postId)

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) RemovePostLike(ctx context.Context, postId, accountId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "RemovePostLike_" + postId + "_" + accountId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.RemovePostLike, postId)

	if err != nil {
		return err
	}

	return nil
}
