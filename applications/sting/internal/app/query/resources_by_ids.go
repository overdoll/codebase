package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/resource"
)

type ResourcesByIds struct {
	ItemId      string
	ResourceIds []string
}

type ResourcesByIdsHandler struct {
	rr resource.Repository
}

func NewResourcesByIdsHandler(rr resource.Repository) ResourcesByIdsHandler {
	return ResourcesByIdsHandler{rr: rr}
}

func (h ResourcesByIdsHandler) Handle(ctx context.Context, query ResourcesByIds) ([]*resource.Resource, error) {

	result, err := h.rr.GetResourcesByIds(ctx, query.ItemId, query.ResourceIds)

	if err != nil {
		return nil, err
	}

	return result, nil
}
