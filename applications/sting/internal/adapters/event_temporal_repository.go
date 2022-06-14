package adapters

import (
	"context"
	"crypto/md5"
	"encoding/hex"
	"github.com/spf13/viper"
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors"
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
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "sting.PublishPost_" + postId,
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.PublishPost, workflows.PublishPostInput{
		PostId: postId,
	})

	if err != nil {
		return errors.Wrap(err, "failed to run publish post workflow")
	}

	return nil
}

func (r EventTemporalRepository) DiscardPost(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "sting.DiscardPost_" + postId,
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.DiscardPost, workflows.DiscardPostInput{
		PostId: postId,
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute discard post workflow")
	}

	return nil
}

func (r EventTemporalRepository) DeletePost(ctx context.Context, requester *principal.Principal, pst *post.Post) error {

	if err := pst.CanDelete(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "sting.DeletePost_" + pst.ID(),
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.DeletePost, workflows.DeletePostInput{
		PostId: pst.ID(),
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute delete post workflow")
	}

	return nil
}

func (r EventTemporalRepository) ArchivePost(ctx context.Context, requester *principal.Principal, pst *post.Post) error {

	if err := pst.CanArchive(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.ArchivePost_" + pst.ID(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.ArchivePost, workflows.ArchivePostInput{
		PostId: pst.ID(),
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute archive post workflow")
	}

	return nil
}

func (r EventTemporalRepository) UnArchivePost(ctx context.Context, requester *principal.Principal, pst *post.Post) error {

	if err := pst.CanUnArchive(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.UnArchivePost_" + pst.ID(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.UnArchivePost, workflows.UnArchivePostInput{
		PostId: pst.ID(),
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute un archive post workflow")
	}

	return nil
}

func (r EventTemporalRepository) RemovePost(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "sting.RemovePost_" + postId,
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.RemovePost, workflows.RemovePostInput{
		PostId: postId,
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute remove post workflow")
	}

	return nil
}

func (r EventTemporalRepository) SubmitPost(ctx context.Context, requester *principal.Principal, pst *post.Post, submitTime time.Time) error {

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "sting.SubmitPost_" + pst.ID(),
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.SubmitPost, workflows.SubmitPostInput{
		PostId:   pst.ID(),
		PostDate: submitTime,
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute submit post workflow")
	}

	return nil
}

func (r EventTemporalRepository) AddPostLike(ctx context.Context, like *post.Like) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.AddPostLike_" + like.PostId() + "_" + like.AccountId(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.AddPostLike, workflows.AddPostLikeInput{
		PostId:    like.PostId(),
		AccountId: like.AccountId(),
		LikedAt:   like.LikedAt(),
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute add post like workflow")
	}

	return nil
}

func (r EventTemporalRepository) RemovePostLike(ctx context.Context, like *post.Like) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.RemovePostLike_" + like.PostId() + "_" + like.AccountId(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.RemovePostLike, workflows.RemovePostLikeInput{
		PostId:    like.PostId(),
		AccountId: like.AccountId(),
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute remove post like workflow")
	}

	return nil
}

func (r EventTemporalRepository) DeleteAccountData(ctx context.Context, accountId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.DeleteAccountData_" + accountId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.DeleteAccountData, workflows.DeleteAccountDataInput{
		AccountId: accountId,
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute delete account data workflow")
	}

	return nil
}

func (r EventTemporalRepository) ProcessResourcesForPost(ctx context.Context, post *post.Post, resources []*post.Resource) error {

	var resourceIds []string

	processResourcesHash := md5.New()
	processResourcesHash.Write([]byte(post.ID()))
	for _, resource := range resources {
		processResourcesHash.Write([]byte(resource.ItemId()))
		processResourcesHash.Write([]byte(resource.ID()))

		resourceIds = append(resourceIds, resource.ID())
	}

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "sting.ProcessResourcesForPostUpload_" + hex.EncodeToString(processResourcesHash.Sum(nil)[:]),
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.ProcessResourcesForPost,
		workflows.ProcessResourcesForPostInput{
			PostId:      post.ID(),
			ResourceIds: resourceIds,
		},
	)

	if err != nil {
		return errors.Wrap(err, "failed to run process resources for post workflow")
	}

	return nil
}

func (r EventTemporalRepository) DeleteResourcesForPost(ctx context.Context, postId string, resourceIds []string) error {

	deleteResourcesHash := md5.New()
	deleteResourcesHash.Write([]byte(postId))
	for _, resource := range resourceIds {
		deleteResourcesHash.Write([]byte(resource))
	}

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "sting.DeleteProcessedResourcesForPost_" + hex.EncodeToString(deleteResourcesHash.Sum(nil)[:]),
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.DeleteResourcesForPost,
		workflows.DeleteResourcesForPostInput{
			PostId:      postId,
			ResourceIds: resourceIds,
		},
	)

	if err != nil {
		return errors.Wrap(err, "failed to run delete resources workflow")
	}

	return nil
}
