package query

import (
	"context"
	"overdoll/applications/loader/internal/domain/resource"
)

type ResourcesByIdsWithUrls struct {
	ItemIds     []string
	ResourceIds []string
}

type ResourcesByIdsWithUrlsHandler struct {
	rr resource.Repository
}

func NewResourcesByIdsWithUrlsHandler(rr resource.Repository) ResourcesByIdsWithUrlsHandler {
	return ResourcesByIdsWithUrlsHandler{rr: rr}
}

func (h ResourcesByIdsWithUrlsHandler) Handle(ctx context.Context, query ResourcesByIdsWithUrls) ([]*resource.Resource, error) {

	result, err := h.rr.GetResourcesByIdsWithUrls(ctx, query.ItemIds, query.ResourceIds)

	if err != nil {
		return nil, err
	}

	return result, nil
}
