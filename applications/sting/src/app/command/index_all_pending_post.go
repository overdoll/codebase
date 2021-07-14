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

	for _, pst := range posts {
		usr, err := h.eva.GetAccount(ctx, pst.Contributor().ID())

		if err != nil {
			return err
		}

		// get proper contributor data because it's not correct (only ID is returned)
		pst.UpdateContributor(usr)
	}

	return h.pi.BulkIndexPendingPosts(ctx, posts)
}
