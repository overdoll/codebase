package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type StartUndoPostHandler struct {
	pi post.IndexRepository
	pr post.Repository
}

func NewStartUndoPostHandler(pr post.Repository, pi post.IndexRepository) StartUndoPostHandler {
	return StartUndoPostHandler{pr: pr, pi: pi}
}

func (h StartUndoPostHandler) Handle(ctx context.Context, id string) error {

	pst, err := h.pr.GetPendingPost(ctx, id)

	if err != nil {
		return err
	}

	if err := pst.MakeUndo(); err != nil {
		return err
	}

	return nil
}
