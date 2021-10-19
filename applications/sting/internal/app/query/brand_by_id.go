package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type BrandById struct {
	Principal *principal.Principal
	Id        string
}

type BrandByIdHandler struct {
	pr post.Repository
}

func NewBrandByIdHandler(pr post.Repository) BrandByIdHandler {
	return BrandByIdHandler{pr: pr}
}

func (h BrandByIdHandler) Handle(ctx context.Context, query BrandById) (*post.Brand, error) {

	result, err := h.pr.GetBrandById(ctx, query.Principal, query.Id)

	if err != nil {
		return nil, err
	}

	return result, nil
}
