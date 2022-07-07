package activities

import (
	"context"
	"os"
	"overdoll/applications/loader/internal/domain/resource"
)

type ProcessResourcesWithFiltersFromCopyInput struct {
	ItemId      string
	ResourceIds []string
	Width       uint64
	Height      uint64
	Pixelate    *int
}

type copyPairs struct {
	oldResource *resource.Resource
	newResource *resource.Resource
}

func (h *Activities) ProcessResourcesWithFiltersFromCopy(ctx context.Context, input ProcessResourcesWithFiltersFromCopyInput) error {

	// first, get all resources
	resourcesFromIds, err := h.rr.GetResourcesByIds(ctx, []string{input.ItemId}, input.ResourceIds)

	if err != nil {
		return err
	}

	var copyPairedResources []*copyPairs

	for _, target := range resourcesFromIds {

		res, err := h.rr.GetResourceById(ctx, target.CopiedItemId(), target.CopiedId())

		if err != nil {
			return err
		}

		copyPairedResources = append(copyPairedResources, &copyPairs{
			oldResource: res,
			newResource: target,
		})
	}

	for _, target := range copyPairedResources {
		if err := processResourceAndFilter(h, ctx, target, input); err != nil {
			return err
		}
	}

	return nil
}

func processResourceAndFilter(h *Activities, ctx context.Context, target *copyPairs, input ProcessResourcesWithFiltersFromCopyInput) error {
	var file *os.File
	var err error

	if target.oldResource.IsVideo() {
		file, err = h.rr.DownloadVideoThumbnailForResource(ctx, target.oldResource)
	} else {
		file, err = h.rr.DownloadResource(ctx, target.oldResource)
	}

	if err != nil {
		return err
	}

	defer file.Close()
	defer os.Remove(file.Name())

	config, err := resource.NewConfig(input.Width, input.Height)

	if err != nil {
		return err
	}

	filters, err := resource.NewImageFilters(input.Pixelate)

	if err != nil {
		return err
	}

	move, err := target.newResource.ApplyFilters(file, config, filters)

	if err != nil {
		return err
	}

	if err := h.rr.UploadProcessedResource(ctx, move, target.newResource); err != nil {
		return err
	}

	return nil
}