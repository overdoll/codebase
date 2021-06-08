package command

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

type StartDiscardPostHandler struct {
	pi post.IndexRepository
	pr post.Repository
	pe post.EventRepository
}

func NewStartDiscardPostHandler(pr post.Repository, pi post.IndexRepository, pe post.EventRepository) StartDiscardPostHandler {
	return StartDiscardPostHandler{pr: pr, pi: pi, pe: pe}
}

func (h StartDiscardPostHandler) Handle(ctx context.Context, id string) error {

	pendingPost, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PostPending) error {
		return pending.MakeDiscarded()
	})

	if err != nil {
		return err
	}

	if err := h.pi.IndexPendingPost(ctx, pendingPost); err != nil {
		zap.S().Errorf("failed to index post: %s", err)
		return err
	}

	if err := h.pe.DiscardPostEvent(ctx, pendingPost); err != nil {
		zap.S().Errorf("failed to discard post event: %s", err)
		return err
	}

	return nil
}
