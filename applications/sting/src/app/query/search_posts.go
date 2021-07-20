package query

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
)

type SearchPostsHandler struct {
	pr post.IndexRepository
}

func NewSearchPostsHandler(pr post.IndexRepository) SearchPostsHandler {
	return SearchPostsHandler{pr: pr}
}

func (h SearchPostsHandler) Handle(ctx context.Context, cursor *paging.Cursor, characterName, mediaTitle, categoryTitle, artistUsername string) ([]*post.Post, *paging.Info, error) {
	return nil, nil, nil
}
