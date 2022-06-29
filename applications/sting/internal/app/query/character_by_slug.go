package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type CharacterBySlug struct {
	Principal  *principal.Principal
	Slug       string
	SeriesSlug string
}

type CharacterBySlugHandler struct {
	pr post.Repository
}

func NewCharacterBySlugHandler(pr post.Repository) CharacterBySlugHandler {
	return CharacterBySlugHandler{pr: pr}
}

func (h CharacterBySlugHandler) Handle(ctx context.Context, query CharacterBySlug) (*post.Character, error) {

	result, err := h.pr.GetCharacterBySlug(ctx, query.Slug, query.SeriesSlug)

	if err != nil {
		return nil, err
	}

	return result, nil
}
