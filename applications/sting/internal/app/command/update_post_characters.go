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
	pi post.IndexRepository
}

func NewUpdatePostCharactersHandler(pr post.Repository, pi post.IndexRepository) UpdatePostCharactersHandler {
	return UpdatePostCharactersHandler{pr: pr, pi: pi}
}

func (h UpdatePostCharactersHandler) Handle(ctx context.Context, cmd UpdatePostCharacters) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostCharacters(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {

		chars, err := h.pr.GetCharactersByIds(ctx, cmd.Principal, cmd.CharacterIds)

		if err != nil {
			return err
		}

		return post.UpdateCharactersRequest(cmd.Principal, chars)
	})

	if err != nil {
		return nil, err
	}

	// index the post
	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return nil, err
	}

	return pendingPost, nil
}
