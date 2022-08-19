package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type IndexPost struct {
	PostId string
}

type IndexPostHandler struct {
	pr post.Repository
}

func NewIndexPostHandler(pr post.Repository) IndexPostHandler {
	return IndexPostHandler{pr: pr}
}

func (h IndexPostHandler) Handle(ctx context.Context, cmd IndexPost) error {
	return h.pr.IndexPost(ctx, cmd.PostId)
}
