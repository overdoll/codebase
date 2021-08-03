package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/content"
	"overdoll/applications/sting/internal/domain/post"
)

type UndoPost struct {
	PostId string
}

type UndoPostHandler struct {
	pi  post.IndexRepository
	pr  post.Repository
	cr  content.Repository
	eva EvaService
}

func NewUndoPostHandler(pr post.Repository, pi post.IndexRepository, cr content.Repository, eva EvaService) UndoPostHandler {
	return UndoPostHandler{pr: pr, pi: pi, cr: cr, eva: eva}
}

func (h UndoPostHandler) Handle(ctx context.Context, cmd UndoPost) error {

	// update pending post to back in review
	pendingPost, err := h.pr.UpdatePost(ctx, cmd.PostId, func(pending *post.Post) error {

		// skip job if published or discarded
		if err := pending.MakeUndo(); err != nil {
			return err
		}

		return pending.MakeReview()
	})

	if err != nil {

		if err == post.ErrNotComplete {
			return nil
		}

		return err
	}

	// Index pending post so it's bounced back into review
	return h.pi.IndexPost(ctx, pendingPost)
}
