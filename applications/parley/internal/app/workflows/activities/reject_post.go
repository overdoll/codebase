package activities

import (
	"context"
	"github.com/pkg/errors"
)

type RejectPostInput struct {
	PostId string
}

func (h *Activities) RejectPost(ctx context.Context, input RejectPostInput) error {

	// post approved
	if err := h.sting.RejectPost(ctx, input.PostId); err != nil {
		return errors.Wrap(err, "failed to reject post")
	}

	return nil
}
