package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type IndexAllPendingPostsHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewIndexAllPendingPostsHandler(pr post.Repository, pi post.IndexRepository) IndexAllPendingPostsHandler {
	return IndexAllPendingPostsHandler{pr: pr, pi: pi}
}

func (h IndexAllPendingPostsHandler) Handle(ctx context.Context) error {
	err := h.pi.DeletePendingPostIndex(ctx)

	if err != nil {

	}

	posts, err := h.pr.GetPendingPosts(ctx)

	if err != nil {

	}

	err = h.pi.BulkIndexPendingPosts(ctx, posts)

	if err != nil {

	}

	return nil
}
