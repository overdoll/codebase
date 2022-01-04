package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/resource"
)

type ResourceById struct {
	ItemId     string
	ResourceId string
}

type ResourceByIdHandler struct {
	rr resource.Repository
}

func NewResourceByIdHandler(rr resource.Repository) ResourceByIdHandler {
	return ResourceByIdHandler{rr: rr}
}

func (h ResourceByIdHandler) Handle(ctx context.Context, query ResourceById) (*resource.Resource, error) {

	result, err := h.rr.GetResourceById(ctx, query.ItemId, query.ResourceId)

	if err != nil {
		return nil, err
	}

	return result, nil
}
