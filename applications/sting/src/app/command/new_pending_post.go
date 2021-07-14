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
		// Get our contributor
		usr, err := h.eva.GetAccount(ctx, pending.Contributor().ID())

		if err != nil {
			return err
		}

		// Update contributor, since our database doesn't contain the reference
		pending.UpdateContributor(usr)

		// make post in review
		if err := pending.MakeReview(); err != nil {
			return err
		}

		// Process content (mime-type checks, etc...)
		cnt, err := h.cr.ProcessContent(ctx, pending.Contributor().ID(), pending.RawContent())

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
