package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/media"
)

type UpdateCharacterBannerInput struct {
	CharacterId string
	PostId      string
}

func (h *Activities) UpdateCharacterBanner(ctx context.Context, input UpdateCharacterBannerInput) error {

	var pst *post.Post
	var err error

	if input.PostId != "" {
		pst, err = h.pr.GetPostByIdOperator(ctx, input.PostId)

		if err != nil {
			return err
		}
	} else {
		pst, err = h.pr.GetFirstTopPostWithoutOccupiedMedias(ctx, &input.CharacterId, nil, nil, nil)

		if err != nil {
			return err
		}
	}

	if pst == nil {
		return nil
	}

	var selectedContentResource *media.Media

	for _, cnt := range pst.Content() {
		if !cnt.IsSupporterOnly() {
			selectedContentResource = cnt.Media()
			break
		}
	}

	if selectedContentResource == nil {
		return nil
	}

	_, err = h.pr.UpdateCharacterBannerOperator(ctx, input.CharacterId, func(character *post.Character) error {

		newResource, err := h.loader.GenerateImageFromMedia(ctx, []*media.Media{selectedContentResource}, media.NewCharacterBannerMediaLink(input.CharacterId), nil)

		if err != nil {
			return err
		}

		return character.UpdateBanner(newResource[0])
	})

	if err != nil {
		return err
	}

	return h.pr.AddPostOccupiedMedia(ctx, pst, selectedContentResource)
}
