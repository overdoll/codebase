package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type StartUndoPost struct {
	PostId string
}

type UndoPostHandler struct {
	pi post.IndexRepository
	pr post.Repository
}

func NewUndoPostHandler(pr post.Repository, pi post.IndexRepository) UndoPostHandler {
	return UndoPostHandler{pr: pr, pi: pi}
}

func (h UndoPostHandler) Handle(ctx context.Context, cmd StartUndoPost) error {

	pst, err := h.pr.GetPostOperator(ctx, cmd.PostId)

	if err != nil {
		return err
	}

	return pst.MakeUndo()
}
