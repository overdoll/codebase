package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/media"
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

	char, err := h.pr.UpdateCharacterThumbnail(ctx, cmd.Principal, cmd.CharacterId, func(character *post.Character) error {
		// create resources from content
		resourceIds, err := h.loader.ProcessMediaFromUploads(ctx, []string{cmd.Thumbnail}, media.NewCharacterThumbnailMediaLink(cmd.CharacterId))

		if err != nil {
			return err
		}

		return character.UpdateThumbnail(cmd.Principal, resourceIds[0])
	})

	if err != nil {
		return nil, err
	}

	return char, nil
}
