package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type RejectPost struct {
	PostId string
}

type RejectPostHandler struct {
	pi post.IndexRepository
	pr post.Repository
}

func NewRejectPostHandler(pr post.Repository, pi post.IndexRepository) RejectPostHandler {
	return RejectPostHandler{pr: pr, pi: pi}
}

func (h RejectPostHandler) Handle(ctx context.Context, cmd RejectPost) error {

	pendingPost, err := h.pr.UpdatePost(ctx, cmd.PostId, func(pending *post.Post) error {
		return pending.MakeRejected()
	})

	if err != nil {
		return err
	}

	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return err
	}

	return nil
}
