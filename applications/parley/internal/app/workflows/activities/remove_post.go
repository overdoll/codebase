package activities

import (
	"context"
	"github.com/pkg/errors"
)

type RemovePostInput struct {
	PostId string
}

func (h *Activities) RemovePost(ctx context.Context, input RemovePostInput) error {

	// post approved
	if err := h.sting.RemovePost(ctx, input.PostId); err != nil {
		return errors.Wrap(err, "failed to remove post")
	}

	return nil
}
