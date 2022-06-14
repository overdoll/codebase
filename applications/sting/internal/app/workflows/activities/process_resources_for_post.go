package activities

import (
	"context"
	"os"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors"
)

type ProcessResourcesForPostInput struct {
	PostId      string
	ResourceIds []string
}

func (h *Activities) ProcessResourcesForPost(ctx context.Context, input ProcessResourcesForPostInput) error {

	// first, get all resources
	postResult, err := h.pr.GetPostByIdOperator(ctx, input.PostId)

	if err != nil {
		return err
	}

	var resourcesNotProcessed []*post.Resource

	// gather all resources that are processed = false
	for _, res := range postResult.Content() {
		if !res.Resource().IsProcessed() {
			resourcesNotProcessed = append(resourcesNotProcessed, res.Resource())
		}
	}

	for _, target := range resourcesNotProcessed {

		// first, we need to download the resource
		file, err := h.pr.DownloadResource(ctx, target)

		if err != nil {
			return err
		}

		// process resource, get result of targets that need to be uploaded
		targetsToMove, err := target.ProcessResource(file)

		if err != nil {
			return errors.Wrap(err, "failed to process resource")
		}

		// upload the new resource
		if err := h.pr.UploadProcessedResource(ctx, targetsToMove, target); err != nil {
			return err
		}

		// cleanup file
		_ = file.Close()
		_ = os.Remove(file.Name())
	}

	if err := h.pr.UpdatePostResources(ctx, input.PostId, resourcesNotProcessed); err != nil {
		return err
	}

	return nil
}
