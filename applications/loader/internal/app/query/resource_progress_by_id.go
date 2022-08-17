package query

import (
	"context"
	"overdoll/applications/loader/internal/domain/resource"
)

type ResourceProgressByIds struct {
	ItemIds     []string
	ResourceIds []string
}

type ResourceProgressByIdsHandler struct {
	rr resource.Repository
}

func NewResourceProgressByIdHandler(rr resource.Repository) ResourceProgressByIdsHandler {
	return ResourceProgressByIdsHandler{rr: rr}
}

func (h ResourceProgressByIdsHandler) Handle(ctx context.Context, query ResourceProgressByIds) ([]*resource.Progress, error) {
	return h.rr.GetProgressForResources(ctx, query.ItemIds, query.ResourceIds)
}
