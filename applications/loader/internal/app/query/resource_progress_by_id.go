package query

import (
	"context"
	"overdoll/applications/loader/internal/domain/event"
	"overdoll/applications/loader/internal/domain/resource"
)

type ResourceProgressById struct {
	ItemId     string
	ResourceId string
}

type ResourceProgressByIdHandler struct {
	event event.Repository
}

func NewResourceProgressByIdHandler(event event.Repository) ResourceProgressByIdHandler {
	return ResourceProgressByIdHandler{event: event}
}

func (h ResourceProgressByIdHandler) Handle(ctx context.Context, query ResourceProgressById) (*resource.Progress, error) {
	return h.event.GetResourceProgress(ctx, query.ItemId, query.ResourceId)
}
