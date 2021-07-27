package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type CharacterById struct {
	CharacterId string
}

type CharacterByIdHandler struct {
	pr post.Repository
}

func NewCharacterByIdHandler(pr post.Repository) CharacterByIdHandler {
	return CharacterByIdHandler{pr: pr}
}

func (h CharacterByIdHandler) Handle(ctx context.Context, query CharacterById) (*post.Character, error) {

	result, err := h.pr.GetCharacterById(ctx, query.CharacterId)

	if err != nil {
		return nil, err
	}

	return result, nil
}
