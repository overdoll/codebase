package query

import (
	"context"
	"overdoll/applications/loader/internal/domain/resource"
)

type ResourcesByIds struct {
	ItemIds     []string
	ResourceIds []string
}

type ResourcesByIdsHandler struct {
	rr resource.Repository
}

func NewResourcesByIdsHandler(rr resource.Repository) ResourcesByIdsHandler {
	return ResourcesByIdsHandler{rr: rr}
}

func (h ResourcesByIdsHandler) Handle(ctx context.Context, query ResourcesByIds) ([]*resource.Resource, error) {

	result, err := h.rr.GetResourcesByIds(ctx, query.ItemIds, query.ResourceIds)

	if err != nil {
		return nil, err
	}

	return result, nil
}
