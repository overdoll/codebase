package command

import (
	"context"
	"errors"
	"os"
	"overdoll/applications/loader/internal/domain/event"
	"overdoll/applications/loader/internal/domain/resource"
)

type CopyResourcesAndApplyFilters struct {
	ResourcePairs []struct {
		ItemId     string
		ResourceId string
	}
	Filters struct {
		Pixelate *struct {
			Size int
		}
	}
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

	var filteredResources []*resource.FilteredResource

	resources, err := h.rr.GetResourcesByIds(ctx, itemIds, resourceIds)

	if err != nil {
		return nil, err
	}

	for _, target := range resources {

		if !target.IsProcessed() {
			return nil, errors.New("resource not processed yet")
		}

		var file *os.File

		if target.IsVideo() {
			file, err = h.rr.DownloadVideoThumbnailForResource(ctx, target)
		} else {
			file, err = h.rr.DownloadResource(ctx, target)
		}

		if err != nil {
			return nil, err
		}

		var pixelate *int

		if cmd.Filters.Pixelate != nil {
			pixelate = &cmd.Filters.Pixelate.Size
		}

		filters, err := resource.NewImageFilters(pixelate)

		if err != nil {
			return nil, err
		}

		// create a new processed resource
		filtered, err := resource.NewImageProcessedResource(target.ItemId(), "image/png", cmd.IsPrivate, target.Height(), target.Width())

		if err != nil {
			return nil, err
		}

		// apply filters
		newFile, err := filters.ApplyFilters(file)

		if err != nil {
			return nil, err
		}

		filteredResource, err := resource.NewFilteredResource(target, filtered)

		if err != nil {
			return nil, err
		}

		if err := h.rr.UploadAndCreateResource(ctx, newFile, filtered); err != nil {
			return nil, err
		}

		filteredResources = append(filteredResources, filteredResource)

		// cleanup files
		_ = os.Remove(newFile.Name())
		_ = os.Remove(file.Name())
	}

	return filteredResources, nil
}
