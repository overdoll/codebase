package adapters

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/parley/internal/app/workflows"
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
		ID:        "NewPutPostIntoModeratorQueueWorkflow_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.PutPostIntoModeratorQueue, postId)

	if err != nil {
		return err
	}

	return nil
}
