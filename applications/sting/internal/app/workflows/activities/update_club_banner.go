package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
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
			if cnt.Resource().IsVideo() {
				chosenResource = cnt.Resource().ThumbnailAsRegularResource()
			} else {
				chosenResource = cnt.Resource()
			}
		}
	}

	if chosenResource == nil {
		return nil
	}

	_, err = h.cr.UpdateClubBanner(ctx, pst.ClubId(), func(cl *club.Club) error {
		return cl.UpdateBanner(chosenResource)
	})

	if err != nil {
		return err
	}

	return nil
}
