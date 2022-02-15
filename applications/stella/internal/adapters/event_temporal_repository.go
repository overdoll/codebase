package adapters

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/stella/internal/app/workflows"
)

type EventTemporalRepository struct {
	client client.Client
}

func NewEventTemporalRepository(client client.Client) EventTemporalRepository {
	return EventTemporalRepository{client: client}
}

func (r EventTemporalRepository) AddClubMember(ctx context.Context, clubId, accountId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "AddClubMember_" + clubId + "_" + accountId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.AddClubMember, clubId, accountId); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) RemoveClubMember(ctx context.Context, clubId, accountId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "RemoveClubMember_" + clubId + "_" + accountId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.RemoveClubMember, clubId, accountId); err != nil {
		return err
	}

	return nil
}
