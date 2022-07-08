package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type CharactersByIds struct {
	Principal *principal.Principal
	Ids       []string
}

type CharactersByIdsHandler struct {
	pr post.Repository
}

func NewCharactersByIdsHandler(pr post.Repository) CharactersByIdsHandler {
	return CharactersByIdsHandler{pr: pr}
}

func (h CharactersByIdsHandler) Handle(ctx context.Context, query CharactersByIds) ([]*post.Character, error) {

	result, err := h.pr.GetCharactersByIds(ctx, query.Ids)

	if err != nil {
		return nil, err
	}

	return result, nil
}
