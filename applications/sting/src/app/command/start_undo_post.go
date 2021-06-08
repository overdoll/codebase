package command

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

type StartUndoPostHandler struct {
	pi post.IndexRepository
	pr post.Repository
	pe post.EventRepository
}

func NewStartUndoPostHandler(pr post.Repository, pi post.IndexRepository, pe post.EventRepository) StartUndoPostHandler {
	return StartUndoPostHandler{pr: pr, pi: pi, pe: pe}
}

func (h StartUndoPostHandler) Handle(ctx context.Context, id string) error {

	pst, err := h.pr.GetPendingPost(ctx, id)

	if err != nil {
		return err
	}

	if err := pst.MakeUndo(); err != nil {
		return err
	}

	if err := h.pe.UndoPostEvent(ctx, pst); err != nil {
		zap.S().Errorf("failed to undo post event: %s", err)
		return err
	}

	return nil
}
