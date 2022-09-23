package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type DiscardPostInput struct {
	PostId string
}

func (h *Activities) DiscardPost(ctx context.Context, input DiscardPostInput) error {

	err := h.pr.UpdatePostContentAndState(ctx, input.PostId, func(pending *post.Post) error {
		return pending.MakeDiscarded()
	})

	if err != nil {
		return err
	}

	return nil
}
