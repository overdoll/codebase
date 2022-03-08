package activities

import (
	"context"
	"github.com/pkg/errors"
)

type DiscardPostInput struct {
	PostId string
}

func (h *Activities) DiscardPost(ctx context.Context, input DiscardPostInput) error {

	// post approved
	if err := h.sting.DiscardPost(ctx, input.PostId); err != nil {
		return errors.Wrap(err, "failed to discard post")
	}

	return nil
}
