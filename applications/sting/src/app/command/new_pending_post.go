package command

import (
	"context"

	"overdoll/applications/sting/src/domain/content"
	"overdoll/applications/sting/src/domain/post"
)

type NewPostActivityHandler struct {
	pr  post.Repository
	pi  post.IndexRepository
	cr  content.Repository
	eva EvaService
}

func NewNewPostActivityHandler(pr post.Repository, pi post.IndexRepository, cr content.Repository, eva EvaService) NewPostActivityHandler {
	return NewPostActivityHandler{pr: pr, cr: cr, eva: eva, pi: pi}
}

func (h NewPostActivityHandler) Handle(ctx context.Context, id string) error {

	pendingPost, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PostPending) error {

		// Process content (mime-type checks, etc...)
		cnt, err := h.cr.ProcessContent(ctx, pending.Contributor().ID(), pending.Content())

		if err != nil {
			return err
		}

		// update content
		pending.UpdateContent(cnt)

		return nil
	})

	if err != nil {
		return err
	}

	// Update pending post index
	return h.pi.IndexPendingPost(ctx, pendingPost)
}
