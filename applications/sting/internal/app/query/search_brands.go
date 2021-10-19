package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchBrands struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	Name      *string
	OrderBy   string
	Slugs     []string
}

type SearchBrandsHandler struct {
	pr post.IndexRepository
}

func NewSearchBrandsHandler(pr post.IndexRepository) SearchBrandsHandler {
	return SearchBrandsHandler{pr: pr}
}

func (h SearchBrandsHandler) Handle(ctx context.Context, query SearchBrands) ([]*post.Brand, error) {

	filters, err := post.NewObjectFilters(
		query.Name,
		query.OrderBy,
		query.Slugs,
	)

	if err != nil {
		return nil, err
	}

	results, err := h.pr.SearchBrands(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return results, nil
}
