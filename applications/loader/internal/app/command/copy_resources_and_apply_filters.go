package command

import (
	"context"
	"os"
	"overdoll/applications/loader/internal/domain/resource"
)

type CopyResourcesAndApplyFilters struct {
	ResourcePairs []struct {
		ItemId     string
		ResourceId string
	}
	Filters   *resource.ImageFilters
	Config    *resource.Config
	Token     string
	IsPrivate bool
}

type CopyResourcesAndApplyFiltersHandler struct {
	rr resource.Repository
}

func NewCopyResourcesAndApplyFiltersHandler(rr resource.Repository) CopyResourcesAndApplyFiltersHandler {
	return CopyResourcesAndApplyFiltersHandler{rr: rr}
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

		var file *os.File

		if target.IsVideo() {
			file, err = h.rr.DownloadVideoThumbnailForResource(ctx, target)
		} else {
			file, err = h.rr.DownloadResource(ctx, target)
		}

		if err != nil {
			return nil, err
		}

		// create a new processed resource
		filtered, err := resource.NewImageUnProcessedResource(target.ItemId(), "image/jpeg", cmd.IsPrivate, target.Height(), target.Width(), target.Preview(), cmd.Token)

		if err != nil {
			return nil, err
		}

		move, err := filtered.ApplyFilters(file, cmd.Config, cmd.Filters)

		filteredResource, err := resource.NewFilteredResource(target, filtered)

		if err != nil {
			return nil, err
		}

		if err := h.rr.UploadProcessedResource(ctx, move, filtered); err != nil {
			return nil, err
		}

		filteredResources = append(filteredResources, filteredResource)
	}

	return filteredResources, nil
}
