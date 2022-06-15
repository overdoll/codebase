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

		// first, we need to download the resource
		file, err := h.rr.DownloadResource(ctx, target)

		if err != nil {
			return err
		}

		// process resource, get result of targets that need to be uploaded
		targetsToMove, err := target.ProcessResource(file)

		if err != nil {
			return errors.Wrap(err, "failed to process resource")
		}

		// upload the new resource
		if err := h.rr.UploadProcessedResource(ctx, targetsToMove, target); err != nil {
			return err
		}

		// cleanup file
		_ = file.Close()
		_ = os.Remove(file.Name())
	}

	// update database entries for resources
	return nil
}
