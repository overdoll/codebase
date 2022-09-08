package query

import (
	"context"
	resource2 "overdoll/applications/loader/internal/domain/media_processing"
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

func (h ResourcesByIdsHandler) Handle(ctx context.Context, query ResourcesByIds) ([]*resource2.Resource, error) {

	result, err := h.rr.GetResourcesByIds(ctx, query.ItemIds, query.ResourceIds)

	if err != nil {
		return nil, err
	}

	return result, nil
}
