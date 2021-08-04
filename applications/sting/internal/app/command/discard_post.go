package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type StartDiscardPost struct {
	PostId string
}

type DiscardPostHandler struct {
	pi post.IndexRepository
	pr post.Repository
}

func NewDiscardPostHandler(pr post.Repository, pi post.IndexRepository) DiscardPostHandler {
	return DiscardPostHandler{pr: pr, pi: pi}
}

func (h DiscardPostHandler) Handle(ctx context.Context, cmd StartDiscardPost) error {

	pendingPost, err := h.pr.UpdatePost(ctx, cmd.PostId, func(pending *post.Post) error {
		return pending.MakeDiscarding()
	})

	if err != nil {
		return err
	}

	return h.pi.IndexPost(ctx, pendingPost)
}
