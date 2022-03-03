package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"

	"overdoll/applications/sting/internal/domain/post"
)

type DiscardPost struct {
	PostId string
}

type DiscardPostHandler struct {
	pi    post.IndexRepository
	pr    post.Repository
	event event.Repository
}

func NewDiscardPostHandler(pr post.Repository, pi post.IndexRepository, event event.Repository) DiscardPostHandler {
	return DiscardPostHandler{pr: pr, pi: pi, event: event}
}

func (h DiscardPostHandler) Handle(ctx context.Context, cmd DiscardPost) error {

	pendingPost, err := h.pr.UpdatePost(ctx, cmd.PostId, func(pending *post.Post) error {
		return pending.MakeDiscarding()
	})

	if err != nil {
		return err
	}

	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return err
	}

	return h.event.DiscardPost(ctx, pendingPost.ID())
}
