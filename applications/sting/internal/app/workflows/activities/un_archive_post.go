package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type UnArchivePostInput struct {
	PostId string
}

func (h *Activities) UnArchivePost(ctx context.Context, input UnArchivePostInput) error {

	pendingPost, err := h.pr.UpdatePost(ctx, input.PostId, func(pending *post.Post) error {
		return pending.MakePublish()
	})

	if err != nil {
		return err
	}

	// index pending post
	return h.pi.IndexPost(ctx, pendingPost)
}
