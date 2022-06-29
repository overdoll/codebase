package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type UpdateAudienceBannerInput struct {
	AudienceId string
}

func (h *Activities) UpdateAudienceBanner(ctx context.Context, input UpdateAudienceBannerInput) error {

	pst, err := h.pr.GetFirstTopPostWithoutOccupiedResources(ctx, nil, nil, nil, &input.AudienceId)

	if err != nil {
		return err
	}

	if pst == nil {
		return nil
	}

	selectedContentResource := pst.Content()[0].Resource()

	_, err = h.pr.UpdateAudienceBannerOperator(ctx, input.AudienceId, func(audience *post.Audience) error {

		newResource, err := h.loader.CopyResourceIntoImage(ctx, pst.ID(), selectedContentResource.ID(), false)

		if err != nil {
			return err
		}

		return audience.UpdateBanner(newResource.NewResource())
	})

	if err != nil {
		return err
	}

	return h.pr.AddPostOccupiedResource(ctx, pst, selectedContentResource)
}
