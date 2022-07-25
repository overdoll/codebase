package activities

import (
	"context"
	"go.temporal.io/sdk/activity"
	"go.uber.org/zap"
	"os"
	"overdoll/applications/loader/internal/domain/resource"
	"overdoll/libraries/errors"
)

type ProcessResourcesInput struct {
	ItemId     string
	ResourceId string
	Width      uint64
	Height     uint64
}

func (h *Activities) ProcessResources(ctx context.Context, input ProcessResourcesInput) error {

	// first, get all resources
	resourcesFromIds, err := h.rr.GetResourcesByIds(ctx, []string{input.ItemId}, []string{input.ResourceId})

	if err != nil {
		return err
	}

	var resourcesNotProcessed []*resource.Resource

	// gather all resources that are processed = false
	for _, res := range resourcesFromIds {
		resourcesNotProcessed = append(resourcesNotProcessed, res)
	}

	config, err := resource.NewConfig(input.Width, input.Height)

	if err != nil {
		return err
	}

	// when progress is made on the resource socket, we record a heartbeat
	if err := resource.ListenProgressSocket(input.ItemId, input.ResourceId, func(progress float64) {

		// record heartbeat so we know this activity is still functional
		activity.RecordHeartbeat(ctx, progress)

		if err = h.event.SendProcessResourcesProgress(ctx, input.ItemId, input.ResourceId, progress); err != nil {
			zap.S().Errorw("failed to send process resources progress", zap.Error(err))
		}

	}); err != nil {
		return err
	}

	for _, target := range resourcesNotProcessed {
		if err := processResource(h, ctx, target, config); err != nil {
			return err
		}
	}

	// update database entries for resources
	return nil
}

func processResource(h *Activities, ctx context.Context, target *resource.Resource, config *resource.Config) error {

	// first, we need to download the resource
	file, err := h.rr.DownloadResourceUpload(ctx, target)

	if err != nil {
		return err
	}

	// make sure we always get rid of the file after we're done
	defer file.Close()
	defer os.Remove(file.Name())

	// process resource, get result of targets that need to be uploaded
	targetsToMove, err := target.ProcessResource(file, config)

	if err != nil {
		return errors.Wrap(err, "failed to process resource")
	}

	// if the resource failed to process, update && return
	if target.Failed() {
		return h.rr.UpdateResourceFailed(ctx, target)
	}

	// upload the new resource
	if err := h.rr.UploadProcessedResource(ctx, targetsToMove, target); err != nil {
		return err
	}

	return nil
}
