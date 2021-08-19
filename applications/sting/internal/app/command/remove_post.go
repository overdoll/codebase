package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type RemovePost struct {
	PostId string
}

type RemovePostHandler struct {
	pi post.IndexRepository
	pr post.Repository
}

func NewRemovePostHandler(pr post.Repository, pi post.IndexRepository) RemovePostHandler {
	return RemovePostHandler{pr: pr, pi: pi}
}

func (h RemovePostHandler) Handle(ctx context.Context, cmd RemovePost) error {

	pendingPost, err := h.pr.UpdatePost(ctx, cmd.PostId, func(pending *post.Post) error {
		return pending.MakeRemoving()
	})

	if err != nil {
		return err
	}

	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return err
	}

	return nil
}
