package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type CategoriesByIds struct {
	Principal *principal.Principal
	Ids       []string
}

type CategoriesByIdsHandler struct {
	pr post.Repository
}

func NewCategoriesByIdsHandler(pr post.Repository) CategoriesByIdsHandler {
	return CategoriesByIdsHandler{pr: pr}
}

func (h CategoriesByIdsHandler) Handle(ctx context.Context, query CategoriesByIds) ([]*post.Category, error) {

	result, err := h.pr.GetCategoriesByIds(ctx, query.Ids)

	if err != nil {
		return nil, err
	}

	return result, nil
}
