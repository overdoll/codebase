package command

import (
	"context"
	"overdoll/applications/loader/internal/domain/event"
	resource2 "overdoll/applications/loader/internal/domain/media_processing"
	"overdoll/applications/loader/internal/domain/resource"
)

type CopyResourcesAndApplyFilters struct {
	ResourcePairs []struct {
		ItemId     string
		ResourceId string
	}
	Source    string
	NewItemId string
	Filters   *resource.ImageFilters
	Config    *resource.Config
	Token     string
	IsPrivate bool
}

type CopyResourcesAndApplyFiltersHandler struct {
	rr    resource.Repository
	event event.Repository
}

func NewCopyResourcesAndApplyFiltersHandler(rr resource.Repository, event event.Repository) CopyResourcesAndApplyFiltersHandler {
	return CopyResourcesAndApplyFiltersHandler{rr: rr, event: event}
}

func (h CopyResourcesAndApplyFiltersHandler) Handle(ctx context.Context, cmd CopyResourcesAndApplyFilters) ([]*resource.FilteredResource, error) {

	var itemIds []string
	var resourceIds []string

	for _, item := range cmd.ResourcePairs {
		itemIds = append(itemIds, item.ItemId)
		resourceIds = append(resourceIds, item.ResourceId)
	}

	resources, err := h.rr.GetResourcesByIds(ctx, itemIds, resourceIds)

	if err != nil {
		return nil, err
	}

	var filteredResources []*resource.FilteredResource

	var targetResourceIds []string

	for _, target := range resources {

		// create a new processed resource
		cp, err := resource2.NewImageCopyResource(cmd.NewItemId, "image/jpeg", cmd.IsPrivate, cmd.Token, target.ItemId(), target.ID())

		if err != nil {
			return nil, err
		}

		targetResourceIds = append(targetResourceIds, cp.ID())

		filteredResource, err := resource.NewFilteredResource(target, cp)

		if err != nil {
			return nil, err
		}

		if err := h.rr.CreateResource(ctx, cp); err != nil {
			return nil, err
		}

		filteredResources = append(filteredResources, filteredResource)
	}

	if err := h.event.ProcessResourcesWithFiltersFromCopy(ctx, cmd.NewItemId, targetResourceIds, cmd.Source, cmd.Config, cmd.Filters); err != nil {
		return nil, err
	}

	return filteredResources, nil
}
