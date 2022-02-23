package activities

import (
	"context"
	"fmt"
	"os"
	"overdoll/applications/loader/internal/domain/resource"
)

func (h *Activities) ProcessResources(ctx context.Context, itemId string, resourceIds []string) error {

	// first, get all resources
	resourcesFromIds, err := h.rr.GetResourcesByIds(ctx, []string{itemId}, resourceIds)

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
			return fmt.Errorf("failed to process resource: %v", err)
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
