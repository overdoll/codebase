package adapters

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/loader/internal/app/workflows"
	"overdoll/libraries/errors"
	"overdoll/libraries/uuid"
)

type EventTemporalRepository struct {
	client client.Client
}

func NewEventTemporalRepository(client client.Client) EventTemporalRepository {
	return EventTemporalRepository{client: client}
}

func (r EventTemporalRepository) ProcessResources(ctx context.Context, itemId string, resourceIds []string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "ProcessResourcesForUpload" + uuid.New().String(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.ProcessResources,
		workflows.ProcessResourcesInput{
			ItemId:      itemId,
			ResourceIds: resourceIds,
		},
	)

	if err != nil {
		return errors.Wrap(err, "failed to run process resources workflow")
	}

	return nil
}

func (r EventTemporalRepository) DeleteResources(ctx context.Context, itemId string, resourceIds []string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "DeleteProcessedResources" + uuid.New().String(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.DeleteResources,
		workflows.DeleteResourcesInput{
			ItemId:      itemId,
			ResourceIds: resourceIds,
		},
	)

	if err != nil {
		return errors.Wrap(err, "failed to run delete resources workflow")
	}

	return nil
}
