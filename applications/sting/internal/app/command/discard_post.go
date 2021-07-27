package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/content"
	"overdoll/applications/sting/internal/domain/post"
)

type DiscardPost struct {
	PostId string
}

type DiscardPostHandler struct {
	pi  post.IndexRepository
	pr  post.Repository
	cnt content.Repository
	eva EvaService
}

func NewDiscardPostHandler(pr post.Repository, pi post.IndexRepository, cnt content.Repository, eva EvaService) DiscardPostHandler {
	return DiscardPostHandler{pr: pr, pi: pi, eva: eva, cnt: cnt}
}

func (h DiscardPostHandler) Handle(ctx context.Context, cmd DiscardPost) error {

	pendingPost, err := h.pr.UpdatePost(ctx, cmd.PostId, func(pending *post.Post) error {

		// On discarded posts, delete the content from S3
		if err := h.cnt.DeleteProcessedContent(ctx, pending.ContributorId(), pending.Content()); err != nil {
			return err
		}

		return pending.MakeDiscarded()
	})

	if err != nil {
		return err
	}

	// delete document because it's been processed
	if err := h.pi.DeletePost(ctx, pendingPost.ID()); err != nil {
		return err
	}

	return nil
}
