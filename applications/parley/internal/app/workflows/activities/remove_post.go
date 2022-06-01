package activities

import (
	"context"
)

type RemovePostInput struct {
	PostId string
}

func (h *Activities) RemovePost(ctx context.Context, input RemovePostInput) error {

	// post approved
	if err := h.sting.RemovePost(ctx, input.PostId); err != nil {
		return err
	}

	return nil
}
