package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

func (h *Activities) PublishPost(ctx context.Context, postId string) error {

	pendingPost, err := h.pr.UpdatePost(ctx, postId, func(pending *post.Post) error {
		// This will make sure the state of the post is always "review" before publishing - we may get an outdated record
		// from the review stage so it will retry at some point
		if err := pending.MakePublish(); err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		return err
	}

	// index pending post
	return h.pi.IndexPost(ctx, pendingPost)
}
