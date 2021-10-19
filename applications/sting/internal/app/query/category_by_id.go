package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type CategoryById struct {
	Principal *principal.Principal
	Id        string
}

type CategoryByIdHandler struct {
	pr post.Repository
}

func NewCategoryByIdHandler(pr post.Repository) CategoryByIdHandler {
	return CategoryByIdHandler{pr: pr}
}

func (h CategoryByIdHandler) Handle(ctx context.Context, query CategoryById) (*post.Category, error) {

	result, err := h.pr.GetCategoryById(ctx, query.Principal, query.Id)

	if err != nil {
		return nil, err
	}

	return result, nil
}
