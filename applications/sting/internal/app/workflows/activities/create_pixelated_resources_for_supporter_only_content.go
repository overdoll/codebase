package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

func (h *Activities) CreatePixelatedResourcesForSupporterOnlyContent(ctx context.Context, postId string) error {

	pendingPost, err := h.pr.UpdatePostContentOperator(ctx, postId, func(pending *post.Post) error {

		var resourceIds []string

		for _, c := range pending.Content() {

			// not supporter only, skip
			if !c.IsSupporterOnly() {
				continue
			}

			resourceIds = append(resourceIds, c.ResourceId())
		}

		if len(resourceIds) > 0 {

			newContents, err := h.loader.CopyResourcesAndApplyPixelateFilter(ctx, postId, resourceIds, 100, false)

			if err != nil {
				return err
			}

			// create new pixelated content
			for _, content := range pending.Content() {
				for _, newContent := range newContents {
					if newContent.OldResourceId() == content.ResourceId() {
						if err := content.UpdateResourceIdHidden(newContent.NewResourceId()); err != nil {
							return err
						}
					}
				}

			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	// index the post
	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return err
	}

	return nil
}
