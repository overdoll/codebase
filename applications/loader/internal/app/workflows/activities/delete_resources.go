package activities

import (
	"context"
)

func (h *Activities) DeleteResources(ctx context.Context, itemId string, resourceIds []string) error {

	res, err := h.rr.GetResourcesByIds(ctx, []string{itemId}, resourceIds)

	if err != nil {
		return err
	}

	// finally, delete database entries
	return h.rr.DeleteResources(ctx, res)
}
