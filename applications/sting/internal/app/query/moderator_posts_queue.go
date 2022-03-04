package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type ModeratorPostsQueue struct {
	Principal          *principal.Principal
	Cursor             *paging.Cursor
	ModeratorAccountId string
}

type ModeratorPostsQueueHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewModeratorPostsQueueHandler(pr post.Repository, pi post.IndexRepository) ModeratorPostsQueueHandler {
	return ModeratorPostsQueueHandler{pi: pi, pr: pr}
}

func (h ModeratorPostsQueueHandler) Handle(ctx context.Context, query ModeratorPostsQueue) ([]*post.Post, error) {

	filters, err := post.NewModeratorPostsQueue(query.ModeratorAccountId)

	if err != nil {
		return nil, err
	}

	posts, err := h.pi.SearchPosts(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
