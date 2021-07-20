package command

import (
	"context"
	"errors"

	"overdoll/applications/sting/src/domain/content"
	"overdoll/applications/sting/src/domain/post"
)

var (
	errFailedNewPost = errors.New("new post failed")
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

	pendingPost, err := h.pr.UpdatePost(ctx, id, func(pending *post.Post) error {
		// make post in review
		if err := pending.MakeReview(); err != nil {
			return err
		}

		// Process content (mime-type checks, etc...)
		cnt, err := h.cr.ProcessContent(ctx, pending.ContributorId(), pending.Content())

		if err != nil {
			return err
		}

		// update content
		pending.UpdateContent(cnt)

		return nil
	})

	if err != nil {
		return errFailedNewPost
	}

	// Update pending post index
	return h.pi.IndexPost(ctx, pendingPost)
}
