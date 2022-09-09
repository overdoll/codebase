package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/resource_options"
	"overdoll/libraries/resource"
)

type UpdateClubBannerInput struct {
	PostId string
}

func (h *Activities) UpdateClubBanner(ctx context.Context, input UpdateClubBannerInput) error {

	pst, err := h.pr.GetPostByIdOperator(ctx, input.PostId)

	if err != nil {
		return err
	}

	var chosenResource *resource.Resource

	for _, cnt := range pst.Content() {
		if !cnt.IsSupporterOnly() {
			chosenResource = cnt.Media()
			break
		}
	}

	if chosenResource == nil {
		return nil
	}

	newContent, err := h.loader.CopyResourceIntoImage(ctx, resource_options.NewResourceOptionsForClubBanner(chosenResource, pst.ClubId()))

	if err != nil {
		return err
	}

	_, err = h.cr.UpdateClubBanner(ctx, pst.ClubId(), func(cl *club.Club) error {
		return cl.UpdateBanner(newContent.NewResource())
	})

	if err != nil {
		return err
	}

	return h.pr.AddPostOccupiedResource(ctx, pst, chosenResource)
}
