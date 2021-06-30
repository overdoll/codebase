package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type IndexAllPendingPostsHandler struct {
	pr  post.Repository
	eva EvaService
	pi  post.IndexRepository
}

func NewIndexAllPendingPostsHandler(pr post.Repository, pi post.IndexRepository, eva EvaService) IndexAllPendingPostsHandler {
	return IndexAllPendingPostsHandler{pr: pr, pi: pi, eva: eva}
}

func (h IndexAllPendingPostsHandler) Handle(ctx context.Context) error {

	if err := h.pi.DeletePendingPostIndex(ctx); err != nil {
		return err
	}

	posts, err := h.pr.GetPendingPosts(ctx)

	if err != nil {
		return err
	}

	for _, _ = range posts {
		// TODO: need to grab contributor + artist to populate pending post
	}

	return h.pi.BulkIndexPendingPosts(ctx, posts)
}
