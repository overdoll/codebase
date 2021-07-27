package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/content"
	"overdoll/applications/sting/internal/domain/post"
)

type NewPost struct {
	PostId string
}

type NewPostHandler struct {
	pr  post.Repository
	pi  post.IndexRepository
	cr  content.Repository
	eva EvaService
}

func NewNewPostHandler(pr post.Repository, pi post.IndexRepository, cr content.Repository, eva EvaService) NewPostHandler {
	return NewPostHandler{pr: pr, cr: cr, eva: eva, pi: pi}
}

func (h NewPostHandler) Handle(ctx context.Context, cmd NewPost) error {

	pendingPost, err := h.pr.UpdatePost(ctx, cmd.PostId, func(pending *post.Post) error {
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
		return err
	}

	// Update pending post index
	return h.pi.IndexPost(ctx, pendingPost)
}
