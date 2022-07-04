package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type UpdateCharacterThumbnail struct {
	Principal   *principal.Principal
	CharacterId string
	Thumbnail   string
}

type UpdateCharacterThumbnailHandler struct {
	pr     post.Repository
	loader LoaderService
}

func NewUpdateCharacterThumbnailHandler(pr post.Repository, loader LoaderService) UpdateCharacterThumbnailHandler {
	return UpdateCharacterThumbnailHandler{pr: pr, loader: loader}
}

func (h UpdateCharacterThumbnailHandler) Handle(ctx context.Context, cmd UpdateCharacterThumbnail) (*post.Character, error) {

	var oldResourceId string

	char, err := h.pr.UpdateCharacterThumbnail(ctx, cmd.Principal, cmd.CharacterId, func(character *post.Character) error {

		if character.ThumbnailResource() != nil {
			oldResourceId = character.ThumbnailResource().ID()
		}

		// create resources from content
		resourceIds, err := h.loader.CreateOrGetResourcesFromUploads(ctx, cmd.CharacterId, []string{cmd.Thumbnail}, false, "CHARACTER", true, 100, 100)

		if err != nil {
			return err
		}

		return character.UpdateThumbnail(cmd.Principal, resourceIds[0])
	})

	if oldResourceId != "" {
		if err := h.loader.DeleteResources(ctx, cmd.CharacterId, []string{oldResourceId}); err != nil {
			return nil, err
		}
	}

	if err != nil {
		return nil, err
	}

	return char, nil
}
