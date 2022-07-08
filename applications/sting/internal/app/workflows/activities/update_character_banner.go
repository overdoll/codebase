package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/resource"
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

	_, err = h.pr.UpdateCharacterBannerOperator(ctx, input.CharacterId, func(character *post.Character) error {

		newResource, err := h.loader.CopyResourceIntoImage(ctx, pst.ID(), selectedContentResource.ID(), false, "CHARACTER_BANNER", 360, 0, character.ID())

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
