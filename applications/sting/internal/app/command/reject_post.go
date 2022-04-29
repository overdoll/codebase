package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type RejectPost struct {
	PostId string
}

type RejectPostHandler struct {
	pr post.Repository
}

func NewRejectPostHandler(pr post.Repository) RejectPostHandler {
	return RejectPostHandler{pr: pr}
}

func (h RejectPostHandler) Handle(ctx context.Context, cmd RejectPost) error {

	_, err := h.pr.UpdatePost(ctx, cmd.PostId, func(pending *post.Post) error {
		return pending.MakeRejected()
	})

	if err != nil {
		return err
	}

	return nil
}
