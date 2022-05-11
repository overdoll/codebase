package adapters

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/domain/post"
	"time"
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
		ID:        "PublishPost_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.PublishPost, workflows.PublishPostInput{
		PostId: postId,
	})

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) DiscardPost(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "DiscardPost_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.DiscardPost, workflows.DiscardPostInput{
		PostId: postId,
	})

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) DeletePost(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "DeletePost_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.DeletePost, workflows.DeletePostInput{
		PostId: postId,
	})

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) ArchivePost(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "ArchivePost_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.ArchivePost, workflows.ArchivePostInput{
		PostId: postId,
	})

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) UnArchivePost(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "UnArchivePost_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.UnArchivePost, workflows.UnArchivePostInput{
		PostId: postId,
	})

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) RemovePost(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "RemovePost_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.RemovePost, workflows.RemovePostInput{
		PostId: postId,
	})

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) SubmitPost(ctx context.Context, postId string, submitTime time.Time) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "SubmitPost_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.SubmitPost, workflows.SubmitPostInput{
		PostId:   postId,
		PostDate: submitTime,
	})

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) AddPostLike(ctx context.Context, like *post.Like) error {

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "AddPostLike_" + like.PostId() + "_" + like.AccountId(),
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.AddPostLike, workflows.AddPostLikeInput{
		PostId:    like.PostId(),
		AccountId: like.AccountId(),
		LikedAt:   like.LikedAt(),
	})

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) RemovePostLike(ctx context.Context, like *post.Like) error {

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "RemovePostLike_" + like.PostId() + "_" + like.AccountId(),
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.RemovePostLike, workflows.RemovePostLikeInput{
		PostId:    like.PostId(),
		AccountId: like.AccountId(),
	})

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) DeleteAccountData(ctx context.Context, accountId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "DeleteAccountData_" + accountId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.DeleteAccountData, workflows.DeleteAccountDataInput{
		AccountId: accountId,
	})

	if err != nil {
		return err
	}

	return nil
}
