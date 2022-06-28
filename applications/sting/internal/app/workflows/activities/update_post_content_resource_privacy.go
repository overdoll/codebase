package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type UpdatePostContentResourcePrivacyInput struct {
	PostId string
}

func (h *Activities) UpdatePostContentResourcePrivacy(ctx context.Context, input UpdatePostContentResourcePrivacyInput) error {

	_, err := h.pr.UpdatePost(ctx, input.PostId, func(pending *post.Post) error {

		var resourceIds []string

		// for all content that is not supporter-only.
		// we grab it and move it from "private" to "non-private"
		for _, cnt := range pending.Content() {
			if !cnt.IsSupporterOnly() {
				resourceIds = append(resourceIds, cnt.Resource().ID())
			}
		}

		newResources, err := h.loader.UpdateResourcePrivacy(ctx, input.PostId, resourceIds, false)

		if err != nil {
			return err
		}

		// update our new resources - they are no longer private
		return pending.UpdateContentExisting(newResources)
	})

	if err != nil {
		return err
	}

	return nil
}
