package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/resource"
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

	var selectedContentResource *resource.Resource

	for _, cnt := range pst.Content() {
		if !cnt.IsSupporterOnly() {
			selectedContentResource = cnt.Resource()
			break
		}
	}

	if selectedContentResource == nil {
		return nil
	}

	_, err = h.pr.UpdateAudienceBannerOperator(ctx, input.AudienceId, func(audience *post.Audience) error {

		newResource, err := h.loader.CopyResourceIntoImage(ctx, pst.ID(), selectedContentResource.ID(), false, "AUDIENCE_BANNER", 360, 640)

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
