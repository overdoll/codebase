package command

import (
	"context"

	"overdoll/applications/sting/src/domain/content"
	"overdoll/applications/sting/src/domain/post"
)

type UndoPostActivityHandler struct {
	pi  post.IndexRepository
	pr  post.Repository
	cr  content.Repository
	eva EvaService
}

func NewUndoPostActivityHandler(pr post.Repository, pi post.IndexRepository, cr content.Repository, eva EvaService) UndoPostActivityHandler {
	return UndoPostActivityHandler{pr: pr, pi: pi, cr: cr, eva: eva}
}

func (h UndoPostActivityHandler) Handle(ctx context.Context, id string) error {

	// Get public post
	pst, err := h.pr.GetPost(ctx, id)

	if err != nil {
		return err
	}

	// Delete post published content
	if err := h.cr.DeletePublicContent(ctx, pst.Content()); err != nil {
		return err
	}

	// Delete actual post
	if err := h.pr.DeletePost(ctx, id); err != nil {
		return err
	}

	// delete from elasticsearch index
	if err := h.pi.DeletePostDocument(ctx, id); err != nil {
		return err
	}

	// update pending post to back in review
	pendingPost, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PostPending) error {
		return pending.MakePublicOrReview()
	})

	if err != nil {
		return err
	}

	// Index pending post so it's bounced back into review
	if err := h.pi.IndexPendingPost(ctx, pendingPost); err != nil {
		return err
	}

	return nil
}
