package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

var (
	errFailedCharacterById = errors.New("character by id failed")
)

type CharacterByIdHandler struct {
	pr post.Repository
}

func NewCharacterByIdHandler(pr post.Repository) CharacterByIdHandler {
	return CharacterByIdHandler{pr: pr}
}

func (h CharacterByIdHandler) Handle(ctx context.Context, characterId string) (*post.Character, error) {

	result, err := h.pr.GetCharacterById(ctx, characterId)

	if err != nil {
		zap.S().Errorf("failed to get character: %s", err)
		return nil, errFailedCharacterById
	}

	return result, nil
}
