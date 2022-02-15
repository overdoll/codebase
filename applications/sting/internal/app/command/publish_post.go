package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"

	"overdoll/applications/sting/internal/domain/post"
)

type PublishPost struct {
	PostId string
}

type PublishPostHandler struct {
	pi    post.IndexRepository
	pr    post.Repository
	event event.Repository
}

func NewPublishPostHandler(pr post.Repository, pi post.IndexRepository, event event.Repository) PublishPostHandler {
	return PublishPostHandler{pr: pr, pi: pi, event: event}
}

func (h PublishPostHandler) Handle(ctx context.Context, cmd PublishPost) error {

	pendingPost, err := h.pr.UpdatePost(ctx, cmd.PostId, func(pending *post.Post) error {
		pending.MakePublishing()
		return nil
	})

	if err != nil {
		return nil
	}

	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return err
	}

	return h.event.PublishPost(ctx, pendingPost.ID())
}
