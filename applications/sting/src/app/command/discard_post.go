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

	pendingPost, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PostPending) error {

		// On discarded posts, delete the content from S3
		if err := h.cnt.DeleteProcessedContent(ctx, pending.Contributor().ID(), pending.RawContent()); err != nil {
			return err
		}

		// update content
		pending.UpdateContent([]string{})

		// clear any custom fields
		pending.RequestResources(make(map[string]string), []string{}, []string{})

		return nil
	})

	if err != nil {
		return err
	}

	if err := h.pi.IndexPendingPost(ctx, pendingPost); err != nil {
		zap.S().Errorf("failed to index post: %s", err)
		return err
	}

	return nil
}
