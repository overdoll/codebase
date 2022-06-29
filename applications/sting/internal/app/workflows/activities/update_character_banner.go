package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type UpdateCharacterBannerInput struct {
	CharacterId string
}

func (h *Activities) UpdateCharacterBanner(ctx context.Context, input UpdateCharacterBannerInput) error {

	pst, err := h.pr.GetFirstTopPostWithoutOccupiedResources(ctx, &input.CharacterId, nil, nil, nil)

	if err != nil {
		return err
	}

	if pst == nil {
		return nil
	}

	selectedContentResource := pst.Content()[0].Resource()

	_, err = h.pr.UpdateCharacterBannerOperator(ctx, input.CharacterId, func(character *post.Character) error {

		newResource, err := h.loader.CopyResourceIntoImage(ctx, pst.ID(), selectedContentResource.ID(), false)

		if err != nil {
			return err
		}

		return character.UpdateBanner(newResource.NewResource())
	})

	if err != nil {
		return err
	}

	return h.pr.AddPostOccupiedResource(ctx, pst, selectedContentResource)
}
