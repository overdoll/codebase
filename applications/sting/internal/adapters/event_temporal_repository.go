package adapters

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
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

func (r EventTemporalRepository) DeletePost(ctx context.Context, requester *principal.Principal, pst *post.Post) error {

	if err := pst.CanDelete(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "DeletePost_" + pst.ID(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.DeletePost, workflows.DeletePostInput{
		PostId: pst.ID(),
	})

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) ArchivePost(ctx context.Context, requester *principal.Principal, pst *post.Post) error {

	if err := pst.CanArchive(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "ArchivePost_" + pst.ID(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.ArchivePost, workflows.ArchivePostInput{
		PostId: pst.ID(),
	})

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) UnArchivePost(ctx context.Context, requester *principal.Principal, pst *post.Post) error {

	if err := pst.CanUnArchive(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "UnArchivePost_" + pst.ID(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.UnArchivePost, workflows.UnArchivePostInput{
		PostId: pst.ID(),
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

func (r EventTemporalRepository) SubmitPost(ctx context.Context, requester *principal.Principal, pst *post.Post, submitTime time.Time) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "SubmitPost_" + pst.ID(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.SubmitPost, workflows.SubmitPostInput{
		PostId:   pst.ID(),
		PostDate: submitTime,
	})

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) AddPostLike(ctx context.Context, like *post.Like) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "AddPostLike_" + like.PostId() + "_" + like.AccountId(),
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
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "RemovePostLike_" + like.PostId() + "_" + like.AccountId(),
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
