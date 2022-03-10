package activities

import (
	"context"
	"github.com/pkg/errors"
)

type PublishPostInput struct {
	PostId string
}

func (h *Activities) PublishPost(ctx context.Context, input PublishPostInput) error {

	// post approved
	if err := h.sting.PublishPost(ctx, input.PostId); err != nil {
		return errors.Wrap(err, "failed to publish post")
	}

	return nil
}
