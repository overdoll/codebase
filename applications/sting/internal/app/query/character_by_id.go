package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type CharacterById struct {
	Principal *principal.Principal
	Id        string
}

type CharacterByIdHandler struct {
	pr post.Repository
}

func NewCharacterByIdHandler(pr post.Repository) CharacterByIdHandler {
	return CharacterByIdHandler{pr: pr}
}

func (h CharacterByIdHandler) Handle(ctx context.Context, query CharacterById) (*post.Character, error) {

	result, err := h.pr.GetCharacterById(ctx, query.Principal, query.Id)

	if err != nil {
		return nil, err
	}

	return result, nil
}
