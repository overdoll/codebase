package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type DeleteAndRecreatePostsIndexHandler struct {
	pr post.Repository
}

func NewDeleteAndRecreatePostsIndexHandler(pr post.Repository) DeleteAndRecreatePostsIndexHandler {
	return DeleteAndRecreatePostsIndexHandler{pr: pr}
}

func (h DeleteAndRecreatePostsIndexHandler) Handle(ctx context.Context) error {
	return h.pr.DeleteAndRecreatePostIndex(ctx)
}
