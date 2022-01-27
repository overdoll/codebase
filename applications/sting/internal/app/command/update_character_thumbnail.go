package command

import (
	"context"
	"github.com/pkg/errors"
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
	pi     post.IndexRepository
	loader LoaderService
}

func NewUpdateCharacterThumbnailHandler(pr post.Repository, pi post.IndexRepository, loader LoaderService) UpdateCharacterThumbnailHandler {
	return UpdateCharacterThumbnailHandler{pr: pr, pi: pi, loader: loader}
}

func (h UpdateCharacterThumbnailHandler) Handle(ctx context.Context, cmd UpdateCharacterThumbnail) (*post.Character, error) {

	char, err := h.pr.UpdateCharacterThumbnail(ctx, cmd.Principal, cmd.CharacterId, func(character *post.Character) error {
		// create resources from content
		resourceIds, err := h.loader.CreateOrGetResourcesFromUploads(ctx, cmd.CharacterId, []string{cmd.Thumbnail})

		if err != nil {
			return errors.Wrap(err, "failed to create or get resources from uploads")
		}

		return character.UpdateThumbnail(cmd.Principal, resourceIds[0])
	})

	if err != nil {
		return nil, err
	}

	if err := h.pi.IndexCharacter(ctx, char); err != nil {
		return nil, err
	}

	return char, nil
}
