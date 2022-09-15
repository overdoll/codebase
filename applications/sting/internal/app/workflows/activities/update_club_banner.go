package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/media"
)

type UpdateClubBannerInput struct {
	PostId string
}

func (h *Activities) UpdateClubBanner(ctx context.Context, input UpdateClubBannerInput) error {

	pst, err := h.pr.GetPostByIdOperator(ctx, input.PostId)

	if err != nil {
		return err
	}

	var chosenResource *media.Media

	for _, cnt := range pst.Content() {
		if !cnt.IsSupporterOnly() {
			chosenResource = cnt.Media()
			break
		}
	}

	if chosenResource == nil {
		return nil
	}

	_, err = h.cr.UpdateClubBanner(ctx, pst.ClubId(), func(cl *club.Club) error {

		newResource, err := h.loader.GenerateImageFromMedia(ctx, []*media.Media{chosenResource}, media.NewClubBannerMediaLink(pst.ClubId()), nil)

		if err != nil {
			return err
		}

		return cl.UpdateBanner(newResource[0])
	})

	if err != nil {
		return err
	}

	return h.pr.AddPostOccupiedMedia(ctx, pst, chosenResource)
}
