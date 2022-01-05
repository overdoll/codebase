package command

import (
	"context"
	"overdoll/applications/loader/internal/domain/resource"
)

type ProcessResourcesFromIdsHandler struct {
	rr resource.Repository
	fr resource.FileRepository
}

func NewProcessResourcesFromIdsHandler(rr resource.Repository, fr resource.FileRepository) ProcessResourcesFromIdsHandler {
	return ProcessResourcesFromIdsHandler{rr: rr, fr: fr}
}

func (h ProcessResourcesFromIdsHandler) Handle(ctx context.Context) error {
	// first, get all resources
	resourcesFromIds, err := h.rr.GetResourcesByIds(ctx, itemId, resourceIds)

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
	if err := r.processResources(ctx, prefix, resourcesNotProcessed); err != nil {
		return err
	}

	// update database entries for resources
	if err := r.updateResources(ctx, resourcesNotProcessed); err != nil {
		return err
	}

	return nil
}
