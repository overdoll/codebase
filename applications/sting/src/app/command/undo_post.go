package command

import (
	"context"

	"overdoll/applications/sting/src/domain/content"
	"overdoll/applications/sting/src/domain/post"
)

type UndoPostHandler struct {
	pi  post.IndexRepository
	pr  post.Repository
	cr  content.Repository
	eva EvaService
}

func NewUndoPostHandler(pr post.Repository, pi post.IndexRepository, cr content.Repository, eva EvaService) UndoPostHandler {
	return UndoPostHandler{pr: pr, pi: pi, cr: cr, eva: eva}
}

func (h UndoPostHandler) Handle(ctx context.Context, id string) error {

	// update pending post to back in review
	pendingPost, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PendingPost) error {

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
	return h.pi.IndexPendingPost(ctx, pendingPost)
}
