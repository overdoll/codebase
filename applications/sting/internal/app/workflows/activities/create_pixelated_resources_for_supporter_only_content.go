package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type CreatePixelatedResourcesForSupporterOnlyContentInput struct {
	PostId string
}

type CreatePixelatedResourcesForSupporterOnlyContentPayload struct {
	CreatedResources bool
}

func (h *Activities) CreatePixelatedResourcesForSupporterOnlyContent(ctx context.Context, input CreatePixelatedResourcesForSupporterOnlyContentInput) (*CreatePixelatedResourcesForSupporterOnlyContentPayload, error) {

	res := &CreatePixelatedResourcesForSupporterOnlyContentPayload{CreatedResources: false}

	_, err := h.pr.UpdatePostContentOperator(ctx, input.PostId, func(pending *post.Post) error {

		var resourceIds []string

		for _, c := range pending.Content() {

			// not supporter only, skip
			if !c.IsSupporterOnly() {
				continue
			}

			resourceIds = append(resourceIds, c.Media().ID())
		}

		if len(resourceIds) > 0 {

			res.CreatedResources = true

			newContents, err := h.loader.CopyResourcesAndApplyPixelateFilter(ctx, input.PostId, resourceIds, 20, false, "POST_PRIVATE_CONTENT")

			if err != nil {
				return err
			}

			// create new pixelated content
			for _, content := range pending.Content() {
				for _, newContent := range newContents {
					if newContent.OldResourceId() == content.Media().ID() {
						if err := content.UpdateMediaHidden(newContent.NewResource()); err != nil {
							return err
						}
					}
				}

			}
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	return res, nil
}
