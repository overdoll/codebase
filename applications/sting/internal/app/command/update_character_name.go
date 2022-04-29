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
}

func NewUpdateCharacterNameHandler(pr post.Repository) UpdateCharacterNameHandler {
	return UpdateCharacterNameHandler{pr: pr}
}

func (h UpdateCharacterNameHandler) Handle(ctx context.Context, cmd UpdateCharacterName) (*post.Character, error) {

	char, err := h.pr.UpdateCharacterName(ctx, cmd.Principal, cmd.CharacterId, func(character *post.Character) error {
		return character.UpdateName(cmd.Principal, cmd.Name, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return char, nil
}
