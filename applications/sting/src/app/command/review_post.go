package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type ReviewPostActivityHandler struct {
	pi  post.IndexRepository
	pr  post.Repository
	eva EvaService
}

func NewReviewPostActivityHandler(pr post.Repository, pi post.IndexRepository, eva EvaService) ReviewPostActivityHandler {
	return ReviewPostActivityHandler{pr: pr, pi: pi, eva: eva}
}

func (h ReviewPostActivityHandler) Handle(ctx context.Context, id string) error {

	pendingPost, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PostPending) (*post.PostPending, error) {

		pending.MakePublishing()

		return pending, nil
	})

	if err != nil {
		return err
	}

	// Update pending post index
	return h.pi.IndexPendingPost(ctx, pendingPost)
}
