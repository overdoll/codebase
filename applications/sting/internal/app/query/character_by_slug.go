package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type CharacterBySlug struct {
	Principal *principal.Principal
	Slug      string
}

type CharacterBySlugHandler struct {
	pi post.IndexRepository
}

func NewCharacterBySlugHandler(pi post.IndexRepository) CharacterBySlugHandler {
	return CharacterBySlugHandler{pi: pi}
}

func (h CharacterBySlugHandler) Handle(ctx context.Context, query CharacterBySlug) (*post.Character, error) {

	result, err := h.pi.GetCharacterBySlug(ctx, query.Principal, query.Slug)

	if err != nil {
		return nil, err
	}

	return result, nil
}
