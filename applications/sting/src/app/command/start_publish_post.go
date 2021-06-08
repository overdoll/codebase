package command

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

type StartPublishPostHandler struct {
	pi post.IndexRepository
	pr post.Repository
	pe post.EventRepository
}

func NewStartPublishPostHandler(pr post.Repository, pi post.IndexRepository, pe post.EventRepository) StartPublishPostHandler {
	return StartPublishPostHandler{pr: pr, pi: pi, pe: pe}
}

func (h StartPublishPostHandler) Handle(ctx context.Context, id string) error {

	pendingPost, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PostPending) error {
		pending.MakePublishing()
		return nil
	})

	if err != nil {
		return err
	}

	if err := h.pe.PublishPostEvent(ctx, pendingPost); err != nil {
		zap.S().Errorf("failed to create post event: %s", err)
		return err
	}

	return nil
}
