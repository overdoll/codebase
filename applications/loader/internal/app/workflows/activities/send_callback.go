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

type SendCallbackPayload struct {
	NotFound bool
}

func (h *Activities) SendCallback(ctx context.Context, input SendCallbackInput) (*SendCallbackPayload, error) {

	// first, get all resources
	resources, err := h.rr.GetResourcesByIds(ctx, []string{input.ItemId}, input.ResourceIds)

	if err != nil {
		return nil, err
	}

	if err := h.callback.SendCallback(ctx, input.Source, resources); err != nil {

		if err == resource.ErrResourceCallbackNotFound {
			return &SendCallbackPayload{NotFound: true}, nil
		}

		return nil, err
	}

	return &SendCallbackPayload{NotFound: false}, nil
}
