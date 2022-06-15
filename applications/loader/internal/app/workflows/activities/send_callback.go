package activities

import (
	"context"
	"overdoll/applications/loader/internal/domain/resource"
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

		// todo: for this error, we do a finite amount of retries (since its possible that the callback was not found when
		// todo: performing it to another service)
		if err == resource.ErrResourceCallbackNotFound {

		}

		return err
	}

	return nil
}
