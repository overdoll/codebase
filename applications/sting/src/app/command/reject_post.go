package command

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

type RejectPostHandler struct {
	pi post.IndexRepository
	pr post.Repository
}

func NewRejectPostHandler(pr post.Repository, pi post.IndexRepository) RejectPostHandler {
	return RejectPostHandler{pr: pr, pi: pi}
}

func (h RejectPostHandler) Handle(ctx context.Context, id string) error {

	pendingPost, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PostPending) error {
		return pending.MakeRejected()
	})

	if err != nil {
		return err
	}

	if err := h.pi.IndexPendingPost(ctx, pendingPost); err != nil {
		zap.S().Errorf("failed to index post: %s", err)
		return err
	}

	return nil
}
