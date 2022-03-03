package command

import (
	"context"
	"overdoll/applications/loader/internal/domain/event"
)

type DeleteResources struct {
	ItemId      string
	ResourceIds []string
}

type DeleteResourcesHandler struct {
	event event.Repository
}

func NewDeleteResourcesHandler(event event.Repository) DeleteResourcesHandler {
	return DeleteResourcesHandler{event: event}
}

func (h DeleteResourcesHandler) Handle(ctx context.Context, cmd DeleteResources) error {
	return h.event.DeleteResources(ctx, cmd.ItemId, cmd.ResourceIds)
}
