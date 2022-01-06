package activities

import (
	"context"
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

	// process resources
	if err := h.fr.UploadProcessedResources(ctx, resourcesNotProcessed); err != nil {
		return err
	}

	// update database entries for resources
	return h.rr.UpdateResources(ctx, resourcesNotProcessed)
}
