package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type StartUndoPostHandler struct {
	pi post.IndexRepository
	pr post.Repository
}

func NewStartUndoPostHandler(pr post.Repository, pi post.IndexRepository) StartUndoPostHandler {
	return StartUndoPostHandler{pr: pr, pi: pi}
}

func (h StartUndoPostHandler) Handle(ctx context.Context, id string) error {

	pst, err := h.pr.GetPost(ctx, id)

	if err != nil {
		return err
	}

	return pst.MakeUndo()
}
