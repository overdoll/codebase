package activities

import (
	"context"
	"go.temporal.io/sdk/activity"
	"go.uber.org/zap"
	"os"
	resource2 "overdoll/applications/loader/internal/domain/media_processing"
	"overdoll/applications/loader/internal/domain/resource"
	"overdoll/libraries/errors"
	"strings"
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

	var resourcesNotProcessed []*resource2.Resource

	// gather all resources that are processed = false
	for _, res := range resourcesFromIds {
		resourcesNotProcessed = append(resourcesNotProcessed, res)
	}

	if err = h.rr.UpdateResourceProgress(ctx, input.ItemId, input.ResourceId, float64(0)); err != nil {
		return err
	}

	config, err := resource.NewConfig(input.Width, input.Height)

	if err != nil {
		return err
	}

	var heartbeat int64

	numbersAlreadySent := make(map[int64]bool)

	finished := false

	// when progress is made on the resource socket, we record a heartbeat
	cleanup, err := resource.ListenProgressSocket(input.ItemId, input.ResourceId, func(progress int64) {

		if finished {
			return
		}

		// record heartbeat so we know this activity is still functional
		heartbeat++
		info := activity.GetInfo(ctx)

		// TODO: this heartbeat isn't recorded for some reason? so we make a manual API call (possibly because its called from another goroutine?)
		activity.RecordHeartbeat(ctx, heartbeat)
		if err = h.event.SendProcessResourcesHeartbeat(ctx, info.TaskToken, progress); err != nil {

			if strings.Contains(err.Error(), "workflow execution already completed") {
				return
			}

			if strings.Contains(err.Error(), "invalid activityID or activity already timed out or invoking workflow is completed") {
				return
			}

			zap.S().Errorw("failed to send heartbeat", zap.Error(err))
		}

		_, alreadySentNumber := numbersAlreadySent[progress]

		if !alreadySentNumber {
			numbersAlreadySent[progress] = true

			if err = h.rr.UpdateResourceProgress(ctx, input.ItemId, input.ResourceId, float64(progress)); err != nil {
				zap.S().Errorw("failed to send process resources progress", zap.Error(err))
			}
		}
	})

	defer cleanup()
	defer func() {
		finished = true
	}()

	if err != nil {
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

func processResource(h *Activities, ctx context.Context, target *resource2.Resource, config *resource.Config) error {

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

	if err = h.rr.UpdateResourceProgress(ctx, target.ItemId(), target.ID(), float64(-2)); err != nil {
		return err
	}

	return nil
}
