package activities

import (
	"context"
)

type CancelSubmitPostInput struct {
	PostId string
}

func (h *Activities) CancelSubmitPost(ctx context.Context, input CancelSubmitPostInput) error {
	return h.event.CancelPost(ctx, input.PostId)
}
