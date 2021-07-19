package command

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/content"
	"overdoll/applications/sting/src/domain/post"
)

type DiscardPostHandler struct {
	pi  post.IndexRepository
	pr  post.Repository
	cnt content.Repository
	eva EvaService
}

func NewDiscardPostHandler(pr post.Repository, pi post.IndexRepository, cnt content.Repository, eva EvaService) DiscardPostHandler {
	return DiscardPostHandler{pr: pr, pi: pi, eva: eva, cnt: cnt}
}

func (h DiscardPostHandler) Handle(ctx context.Context, id string) error {

	pendingPost, err := h.pr.UpdatePost(ctx, id, func(pending *post.Post) error {

		// On discarded posts, delete the content from S3
		if err := h.cnt.DeleteProcessedContent(ctx, pending.Contributor().ID(), pending.RawContent()); err != nil {
			return err
		}

		return pending.MakeDiscarded()
	})

	if err != nil {
		return err
	}

	// delete document because it's been processed
	if err := h.pi.DeletePostDocument(ctx, pendingPost.ID()); err != nil {
		zap.S().Errorf("failed to index post: %s", err)
		return err
	}

	return nil
}
