package activities

import (
	"context"
)

type RejectPostInput struct {
	PostId string
}

func (h *Activities) RejectPost(ctx context.Context, input RejectPostInput) error {

	// post approved
	if err := h.sting.RejectPost(ctx, input.PostId); err != nil {
		return err
	}

	return nil
}
