package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type UpdatePostCharacters struct {
	Principal *principal.Principal

	PostId       string
	CharacterIds []string
}

type UpdatePostCharactersHandler struct {
	pr post.Repository
}

func NewUpdatePostCharactersHandler(pr post.Repository) UpdatePostCharactersHandler {
	return UpdatePostCharactersHandler{pr: pr}
}

func (h UpdatePostCharactersHandler) Handle(ctx context.Context, cmd UpdatePostCharacters) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostCharacters(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {

		chars, err := h.pr.GetCharactersByIds(ctx, cmd.CharacterIds)

		if err != nil {
			return err
		}

		return post.UpdateCharactersRequest(cmd.Principal, chars)
	})

	if err != nil {
		return nil, err
	}

	return pendingPost, nil
}
