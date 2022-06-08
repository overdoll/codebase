package activities

import (
	"context"
)

type PublishPostInput struct {
	PostId string
}

func (h *Activities) PublishPost(ctx context.Context, input PublishPostInput) error {

	// post approved
	if err := h.sting.PublishPost(ctx, input.PostId); err != nil {
		return err
	}

	return nil
}
