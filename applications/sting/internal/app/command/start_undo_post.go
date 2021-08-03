package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type StartUndoPost struct {
	PostId string
}

type StartUndoPostHandler struct {
	pi post.IndexRepository
	pr post.Repository
}

func NewStartUndoPostHandler(pr post.Repository, pi post.IndexRepository) StartUndoPostHandler {
	return StartUndoPostHandler{pr: pr, pi: pi}
}

func (h StartUndoPostHandler) Handle(ctx context.Context, cmd StartUndoPost) error {

	pst, err := h.pr.GetPost(ctx, cmd.PostId)

	if err != nil {
		return err
	}

	return pst.MakeUndo()
}
