package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type PublishPostInput struct {
	PostId string
}

func (h *Activities) PublishPost(ctx context.Context, input PublishPostInput) error {

	pendingPost, err := h.pr.UpdatePost(ctx, input.PostId, func(pending *post.Post) error {
		// This will make sure the state of the post is always "review" before publishing - we may get an outdated record
		// from the review stage so it will retry at some point
		return pending.MakePublish()
	})

	if err != nil {
		return err
	}

	// index pending post
	return h.pi.IndexPost(ctx, pendingPost)
}
