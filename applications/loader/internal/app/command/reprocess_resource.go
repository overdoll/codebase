package command

import (
	"context"
	"overdoll/applications/loader/internal/domain/event"
	"overdoll/applications/loader/internal/domain/resource"
	"overdoll/libraries/errors"
)

type ReprocessResource struct {
	ItemId string
	Id     string
	Width  uint64
	Height uint64
	Source string
}

type ReprocessResourceHandler struct {
	rr    resource.Repository
	event event.Repository
}

func NewReprocessResourceHandler(rr resource.Repository, event event.Repository) ReprocessResourceHandler {
	return ReprocessResourceHandler{rr: rr, event: event}
}

func (h ReprocessResourceHandler) Handle(ctx context.Context, cmd ReprocessResource) error {

	resourcesFromIds, err := h.rr.GetResourcesByIds(ctx, []string{cmd.ItemId}, []string{cmd.Id})

	if err != nil {
		return err
	}

	var newResourceIds []string

	for _, target := range resourcesFromIds {
		if target.IsCopied() {
			return errors.New("one or more resources are copied, not allowed")
		}
	}

	config, err := resource.NewConfig(cmd.Width, cmd.Height)

	if err != nil {
		return err
	}

	if err := h.event.ProcessResources(ctx, cmd.ItemId, newResourceIds, cmd.Source, config); err != nil {
		return err
	}

	return nil
}
