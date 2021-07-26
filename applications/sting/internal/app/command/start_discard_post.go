package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type StartDiscardPostHandler struct {
	pi post.IndexRepository
	pr post.Repository
}

func NewStartDiscardPostHandler(pr post.Repository, pi post.IndexRepository) StartDiscardPostHandler {
	return StartDiscardPostHandler{pr: pr, pi: pi}
}

func (h StartDiscardPostHandler) Handle(ctx context.Context, id string) error {

	pendingPost, err := h.pr.UpdatePost(ctx, id, func(pending *post.Post) error {
		return pending.MakeDiscarding()
	})

	if err != nil {
		return err
	}

	return h.pi.IndexPost(ctx, pendingPost)
}
