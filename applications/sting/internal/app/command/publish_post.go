package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type StartPublishPost struct {
	PostId string
}

type PublishPostHandler struct {
	pi  post.IndexRepository
	pr  post.Repository
	eva EvaService
}

func NewPublishPostHandler(pr post.Repository, pi post.IndexRepository, eva EvaService) PublishPostHandler {
	return PublishPostHandler{pr: pr, pi: pi, eva: eva}
}

func (h PublishPostHandler) Handle(ctx context.Context, cmd StartPublishPost) error {

	pendingPost, err := h.pr.UpdatePost(ctx, cmd.PostId, func(pending *post.Post) error {
		pending.MakePublishing()
		return nil
	})

	if err != nil {
		return nil
	}

	return h.pi.IndexPost(ctx, pendingPost)
}
