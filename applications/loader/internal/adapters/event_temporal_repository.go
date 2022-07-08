package adapters

import (
	"context"
	"crypto/md5"
	"encoding/hex"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/loader/internal/app/workflows"
	"overdoll/applications/loader/internal/domain/resource"
	"overdoll/libraries/errors"
)

type EventTemporalRepository struct {
	client client.Client
}

func NewEventTemporalRepository(client client.Client) EventTemporalRepository {
	return EventTemporalRepository{client: client}
}

func (r EventTemporalRepository) ProcessResourcesWithFiltersFromCopy(ctx context.Context, itemId string, resourceIds []string, source string, config *resource.Config, filters *resource.ImageFilters) error {

	processResourcesHash := md5.New()
	processResourcesHash.Write([]byte(itemId))
	for _, resource := range resourceIds {
		processResourcesHash.Write([]byte(resource))
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "loader.ProcessResourcesWithFiltersFromCopy_" + hex.EncodeToString(processResourcesHash.Sum(nil)[:]),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.ProcessResourcesWithFiltersFromCopy,
		workflows.ProcessResourcesWithFiltersFromCopyInput{
			ItemId:      itemId,
			ResourceIds: resourceIds,
			Source:      source,
			Width:       config.Width(),
			Height:      config.Height(),
			Pixelate:    filters.Pixelate(),
		},
	)

	if err != nil {
		return errors.Wrap(err, "failed to run process resources with filters from copy workflow")
	}

	return nil
}

func (r EventTemporalRepository) ProcessResources(ctx context.Context, itemId string, resourceIds []string, source string, config *resource.Config) error {

	processResourcesHash := md5.New()
	processResourcesHash.Write([]byte(itemId))
	for _, resource := range resourceIds {
		processResourcesHash.Write([]byte(resource))
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "loader.ProcessResourcesForUpload_" + hex.EncodeToString(processResourcesHash.Sum(nil)[:]),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.ProcessResources,
		workflows.ProcessResourcesInput{
			ItemId:      itemId,
			ResourceIds: resourceIds,
			Source:      source,
			Width:       config.Width(),
			Height:      config.Height(),
		},
	)

	if err != nil {
		return errors.Wrap(err, "failed to run process resources workflow")
	}

	return nil
}

func (r EventTemporalRepository) DeleteResources(ctx context.Context, itemId string, resourceIds []string) error {

	deleteResourcesHash := md5.New()
	deleteResourcesHash.Write([]byte(itemId))
	for _, resource := range resourceIds {
		deleteResourcesHash.Write([]byte(resource))
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "loader.DeleteProcessedResources_" + hex.EncodeToString(deleteResourcesHash.Sum(nil)[:]),
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
