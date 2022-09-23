package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/media"
)

type CreatePixelatedResourcesForSupporterOnlyContentInput struct {
	PostId string
}

type CreatePixelatedResourcesForSupporterOnlyContentPayload struct {
	CreatedResources  bool
	PixelatedMediaIds []string
}

func (h *Activities) CreatePixelatedResourcesForSupporterOnlyContent(ctx context.Context, input CreatePixelatedResourcesForSupporterOnlyContentInput) (*CreatePixelatedResourcesForSupporterOnlyContentPayload, error) {

	res := &CreatePixelatedResourcesForSupporterOnlyContentPayload{CreatedResources: false}

	var pixelatedMediaIds []string

	_, err := h.pr.UpdatePostContentOperator(ctx, input.PostId, func(pending *post.Post) error {

		var medias []*media.Media

		for _, c := range pending.Content() {

			// not supporter only, skip
			if !c.IsSupporterOnly() {
				continue
			}

			medias = append(medias, c.Media())
		}

		if len(medias) > 0 {

			res.CreatedResources = true

			pixelate := int64(20)

			newContents, err := h.loader.GenerateImageFromMedia(ctx, medias, media.NewPostContentMediaLink(input.PostId), &pixelate)

			if err != nil {
				return err
			}

			// create new pixelated content
			for _, content := range pending.Content() {
				for _, newContent := range newContents {
					if newContent.SourceMediaId() == content.Media().ID() {
						pixelatedMediaIds = append(pixelatedMediaIds, newContent.ID())
						if err := content.UpdateMediaHidden(newContent); err != nil {
							return err
						}
					}
				}

			}

			res.PixelatedMediaIds = pixelatedMediaIds
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	return res, nil
}
