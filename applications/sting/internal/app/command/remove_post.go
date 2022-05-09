package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"

	"overdoll/applications/sting/internal/domain/post"
)

type RemovePost struct {
	PostId string
}

type RemovePostHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewRemovePostHandler(pr post.Repository, event event.Repository) RemovePostHandler {
	return RemovePostHandler{pr: pr, event: event}
}

func (h RemovePostHandler) Handle(ctx context.Context, cmd RemovePost) error {

	pst, err := h.pr.GetPostByIdOperator(ctx, cmd.PostId)

	if err != nil {
		return err
	}

	return h.event.RemovePost(ctx, pst.ID())
}
