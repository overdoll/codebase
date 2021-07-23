package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type IndexAllPostsHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewIndexAllPendingPostsHandler(pr post.Repository, pi post.IndexRepository) IndexAllPostsHandler {
	return IndexAllPostsHandler{pr: pr, pi: pi}
}

func (h IndexAllPostsHandler) Handle(ctx context.Context) error {

	if err := h.pi.DeletePostIndex(ctx); err != nil {
		return err
	}

	return h.pi.IndexAllPosts(ctx)
}
