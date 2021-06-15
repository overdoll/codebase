package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type StartDiscardPostHandler struct {
	pi post.IndexRepository
	pr post.Repository
}

func NewStartDiscardPostHandler(pr post.Repository, pi post.IndexRepository) StartDiscardPostHandler {
	return StartDiscardPostHandler{pr: pr, pi: pi}
}

func (h StartDiscardPostHandler) Handle(ctx context.Context, id string) error {

	_, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PendingPost) error {
		return pending.MakeDiscarded()
	})

	if err != nil {
		return err
	}

	return nil
}
