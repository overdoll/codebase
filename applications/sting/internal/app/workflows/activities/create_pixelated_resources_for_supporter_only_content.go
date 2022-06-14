package activities

import (
	"context"
	"os"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors/domainerror"
)

type CreatePixelatedResourcesForSupporterOnlyContentInput struct {
	PostId string
}

func (h *Activities) CreatePixelatedResourcesForSupporterOnlyContent(ctx context.Context, input CreatePixelatedResourcesForSupporterOnlyContentInput) error {

	_, err := h.pr.UpdatePostContentOperator(ctx, input.PostId, func(pending *post.Post) error {

		for _, c := range pending.Content() {

			target := c.Resource()

			// not supporter only, skip
			if !c.IsSupporterOnly() {
				continue
			}

			if !target.IsProcessed() {
				return domainerror.NewValidation("resource not processed yet")
			}

			var file *os.File
			var err error

			if target.IsVideo() {
				file, err = h.pr.DownloadVideoThumbnailForResource(ctx, target)
			} else {
				file, err = h.pr.DownloadResource(ctx, target)
			}

			if err != nil {
				return err
			}

			pixelate := 100

			filters, err := post.NewImageFilters(&pixelate)

			if err != nil {
				return err
			}

			// create a new processed resource
			filtered, err := post.NewImageProcessedResource(target.ItemId(), "image/png", false, target.Height(), target.Width())

			if err != nil {
				return err
			}

			// apply filters
			newFile, err := filters.ApplyFilters(file)

			if err != nil {
				return err
			}

			filteredResource, err := post.NewFilteredResource(target, filtered)

			if err != nil {
				return err
			}

			if err := h.pr.UploadResource(ctx, newFile, filteredResource.NewResource()); err != nil {
				return err
			}

			// cleanup files
			_ = os.Remove(newFile.Name())
			_ = os.Remove(file.Name())

			if err := c.UpdateResourceHidden(filteredResource.NewResource()); err != nil {
				return err
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}
