package command

import (
	"context"

	"overdoll/applications/sting/src/domain/content"
	"overdoll/applications/sting/src/domain/post"
)

type NewPostHandler struct {
	pr  post.Repository
	pi  post.IndexRepository
	cr  content.Repository
	eva EvaService
}

func NewNewPostHandler(pr post.Repository, pi post.IndexRepository, cr content.Repository, eva EvaService) NewPostHandler {
	return NewPostHandler{pr: pr, cr: cr, eva: eva, pi: pi}
}

func (h NewPostHandler) Handle(ctx context.Context, id string) error {

	pendingPost, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PendingPost) error {
		// make post in review
		if err := pending.MakeReview(); err != nil {
			return err
		}

		// Process content (mime-type checks, etc...)
		cnt, err := h.cr.ProcessContent(ctx, pending.ContributorId(), pending.RawContent())

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
	// TODO: needs to grab user for indexing (add as parameters)
	return h.pi.IndexPendingPost(ctx, pendingPost)
}
