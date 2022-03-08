package activities

import (
	"context"
)

type DeleteResourcesInput struct {
	ItemId      string
	ResourceIds []string
}

func (h *Activities) DeleteResources(ctx context.Context, input DeleteResourcesInput) error {

	res, err := h.rr.GetResourcesByIds(ctx, []string{input.ItemId}, input.ResourceIds)

	if err != nil {
		return err
	}

	// finally, delete database entries
	return h.rr.DeleteResources(ctx, res)
}
