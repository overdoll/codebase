package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"

	"overdoll/applications/sting/internal/domain/post"
)

type DiscardPost struct {
	PostId string
}

type DiscardPostHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewDiscardPostHandler(pr post.Repository, event event.Repository) DiscardPostHandler {
	return DiscardPostHandler{pr: pr, event: event}
}

func (h DiscardPostHandler) Handle(ctx context.Context, cmd DiscardPost) error {

	pst, err := h.pr.GetPostByIdOperator(ctx, cmd.PostId)

	if err != nil {
		return err
	}

	return h.event.DiscardPost(ctx, pst.ID())
}
