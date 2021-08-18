package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
)

type SearchBrands struct {
	Cursor *paging.Cursor
	Name   *string
}

type SearchBrandsHandler struct {
	pr post.IndexRepository
}

func NewSearchBrandsHandler(pr post.IndexRepository) SearchBrandsHandler {
	return SearchBrandsHandler{pr: pr}
}

func (h SearchBrandsHandler) Handle(ctx context.Context, query SearchBrands) ([]*post.Brand, error) {

	results, err := h.pr.SearchBrands(ctx, query.Cursor, query.Name)

	if err != nil {
		return nil, err
	}

	return results, nil
}
