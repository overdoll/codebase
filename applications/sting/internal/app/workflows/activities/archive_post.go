package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type ArchivePostInput struct {
	PostId string
}

func (h *Activities) ArchivePost(ctx context.Context, input ArchivePostInput) error {

	_, err := h.pr.UpdatePost(ctx, input.PostId, func(pending *post.Post) error {
		return pending.MakeArchived()
	})

	if err != nil {
		return err
	}

	// index pending post
	return nil
}
