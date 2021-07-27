package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type StartDiscardPost struct {
	PostId string
}

type StartDiscardPostHandler struct {
	pi post.IndexRepository
	pr post.Repository
}

func NewStartDiscardPostHandler(pr post.Repository, pi post.IndexRepository) StartDiscardPostHandler {
	return StartDiscardPostHandler{pr: pr, pi: pi}
}

func (h StartDiscardPostHandler) Handle(ctx context.Context, cmd StartDiscardPost) error {

	pendingPost, err := h.pr.UpdatePost(ctx, cmd.PostId, func(pending *post.Post) error {
		return pending.MakeDiscarding()
	})

	if err != nil {
		return err
	}

	return h.pi.IndexPost(ctx, pendingPost)
}
