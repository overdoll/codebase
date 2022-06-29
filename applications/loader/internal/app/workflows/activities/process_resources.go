package activities

import (
	"context"
	"os"
	"overdoll/applications/loader/internal/domain/resource"
	"overdoll/libraries/errors"
)

type ProcessResourcesInput struct {
	ItemId      string
	ResourceIds []string
}

func (h *Activities) ProcessResources(ctx context.Context, input ProcessResourcesInput) error {

	// first, get all resources
	resourcesFromIds, err := h.rr.GetResourcesByIds(ctx, []string{input.ItemId}, input.ResourceIds)

	if err != nil {
		return err
	}

	var resourcesNotProcessed []*resource.Resource

	// gather all resources that are processed = false
	for _, res := range resourcesFromIds {
		if !res.IsProcessed() {
			resourcesNotProcessed = append(resourcesNotProcessed, res)
		}
	}

	for _, target := range resourcesNotProcessed {
		if err := process(h, ctx, target); err != nil {
			return err
		}
	}

	// update database entries for resources
	return nil
}

func process(h *Activities, ctx context.Context, target *resource.Resource) error {

	// first, we need to download the resource
	file, err := h.rr.DownloadResource(ctx, target)

	// make sure we always get rid of the file after we're done
	defer file.Close()
	defer os.Remove(file.Name())

	if err != nil {
		return err
	}

	// process resource, get result of targets that need to be uploaded
	targetsToMove, err := target.ProcessResource(file)

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
