package adapters

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/parley/internal/app/workflows"
	"overdoll/libraries/principal"
)

type EventTemporalRepository struct {
	client client.Client
}

func NewEventTemporalRepository(client client.Client) EventTemporalRepository {
	return EventTemporalRepository{client: client}
}

func (r EventTemporalRepository) PutPostIntoModeratorQueue(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "PutPostIntoModeratorQueue_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.PutPostIntoModeratorQueue, workflows.PutPostIntoModeratorQueueInput{
		PostId: postId,
	})

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) RejectPost(ctx context.Context, requester *principal.Principal, clubId, postId, ruleId string, notes *string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "RejectPost_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.RejectPost, workflows.RejectPostInput{
		AccountId: requester.AccountId(),
		PostId:    postId,
		ClubId:    clubId,
		RuleId:    ruleId,
		Notes:     notes,
	})

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) RemovePost(ctx context.Context, requester *principal.Principal, clubId, postId, ruleId string, notes *string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "RemovePost_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.RemovePost, workflows.RemovePostInput{
		AccountId: requester.AccountId(),
		PostId:    postId,
		RuleId:    ruleId,
		ClubId:    clubId,
		Notes:     notes,
	})

	if err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) ApprovePost(ctx context.Context, requester *principal.Principal, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "ApprovePost_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.ApprovePost, workflows.ApprovePostInput{
		AccountId: requester.AccountId(),
		PostId:    postId,
	})

	if err != nil {
		return err
	}

	return nil
}
