package query

import (
	"context"
	resource2 "overdoll/applications/loader/internal/domain/resource"
)

type ResourcesByIds struct {
	ItemId      string
	ResourceIds []string
}

type ResourcesByIdsHandler struct {
	rr resource2.Repository
}

func NewResourcesByIdsHandler(rr resource2.Repository) ResourcesByIdsHandler {
	return ResourcesByIdsHandler{rr: rr}
}

func (h ResourcesByIdsHandler) Handle(ctx context.Context, query ResourcesByIds) ([]*resource2.Resource, error) {

	result, err := h.rr.GetResourcesByIds(ctx, query.ItemId, query.ResourceIds)

	if err != nil {
		return nil, err
	}

	return result, nil
}
