package command

import (
	"context"
	"go.uber.org/zap"
	"overdoll/applications/sting/internal/domain/post"
)

type RemoveCharacter struct {
	CharacterId string
}

type RemoveCharacterHandler struct {
	pr post.Repository
}

func NewRemoveCharacterHandler(pr post.Repository) RemoveCharacterHandler {
	return RemoveCharacterHandler{pr: pr}
}

func (h RemoveCharacterHandler) Handle(ctx context.Context, cmd RemoveCharacter) error {

	character, err := h.pr.GetCharacterById(ctx, cmd.CharacterId)

	if err != nil {
		return err
	}

	if err := h.pr.ScanPosts(ctx, "", "", func(char *post.Post) error {

		characters, err := h.pr.GetCharactersByIds(ctx, char.CharacterIds())
		if err != nil {
			return err
		}

		var newCharacters []*post.Character

		var found bool

		for _, cat := range characters {
			if cat.ID() == cmd.CharacterId {
				found = true
			} else {
				newCharacters = append(newCharacters, cat)
			}
		}

		if !found {
			return nil
		}

		_, err = h.pr.UpdatePostCharactersOperator(ctx, char.ID(), func(aud *post.Post) error {
			return aud.UpdateCharacters(newCharacters)
		})

		if err != nil {
			return err
		}

		zap.S().Infow("removed character from post", zap.String("id", char.ID()))

		return nil
	}); err != nil {
		return err
	}

	// finally, delete our category
	return h.pr.DeleteCharacter(ctx, character)
}
