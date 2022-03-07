package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"

	"overdoll/applications/sting/internal/domain/post"
)

type PublishPost struct {
	PostId string
}

type PublishPostHandler struct {
	pi    post.IndexRepository
	pr    post.Repository
	event event.Repository
}

func NewPublishPostHandler(pr post.Repository, pi post.IndexRepository, event event.Repository) PublishPostHandler {
	return PublishPostHandler{pr: pr, pi: pi, event: event}
}

func (h PublishPostHandler) Handle(ctx context.Context, cmd PublishPost) error {

	pst, err := h.pr.GetPostByIdOperator(ctx, cmd.PostId)

	if err != nil {
		return err
	}

	return h.event.PublishPost(ctx, pst.ID())
}
