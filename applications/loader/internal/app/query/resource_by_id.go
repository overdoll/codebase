package query

import (
	"context"
	resource2 "overdoll/applications/loader/internal/domain/resource"
)

type ResourceById struct {
	ItemId     string
	ResourceId string
}

type ResourceByIdHandler struct {
	rr resource2.Repository
}

func NewResourceByIdHandler(rr resource2.Repository) ResourceByIdHandler {
	return ResourceByIdHandler{rr: rr}
}

func (h ResourceByIdHandler) Handle(ctx context.Context, query ResourceById) (*resource2.Resource, error) {

	result, err := h.rr.GetResourceById(ctx, query.ItemId, query.ResourceId)

	if err != nil {
		return nil, err
	}

	return result, nil
}
