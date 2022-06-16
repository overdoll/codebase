package activities

import (
	"context"
)

type SendCallbackInput struct {
	ItemId      string
	ResourceIds []string
	Source      string
}

func (h *Activities) SendCallback(ctx context.Context, input SendCallbackInput) error {

	// first, get all resources
	resources, err := h.rr.GetResourcesByIds(ctx, []string{input.ItemId}, input.ResourceIds)

	if err != nil {
		return err
	}

	if err := h.callback.SendCallback(ctx, input.Source, resources); err != nil {
		return err
	}

	return nil
}
