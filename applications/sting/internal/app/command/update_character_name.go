package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type UpdateCharacterName struct {
	Principal   *principal.Principal
	CharacterId string
	Name        string
	Locale      string
}

type UpdateCharacterNameHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewUpdateCharacterNameHandler(pr post.Repository, pi post.IndexRepository) UpdateCharacterNameHandler {
	return UpdateCharacterNameHandler{pr: pr, pi: pi}
}

func (h UpdateCharacterNameHandler) Handle(ctx context.Context, cmd UpdateCharacterName) (*post.Character, error) {

	char, err := h.pr.UpdateCharacterName(ctx, cmd.Principal, cmd.CharacterId, func(character *post.Character) error {
		return character.UpdateName(cmd.Principal, cmd.Name, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	if err := h.pi.IndexCharacter(ctx, char); err != nil {
		return nil, err
	}

	return char, nil
}
