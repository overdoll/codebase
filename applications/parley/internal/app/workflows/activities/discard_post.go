package activities

import (
	"context"
)

type DiscardPostInput struct {
	PostId string
}

func (h *Activities) DiscardPost(ctx context.Context, input DiscardPostInput) error {

	// post approved
	if err := h.sting.DiscardPost(ctx, input.PostId); err != nil {
		return err
	}

	return nil
}
