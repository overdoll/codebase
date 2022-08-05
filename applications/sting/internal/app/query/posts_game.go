package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type PostsGame struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	Seed      string
	Slug      string
}

type PostsGameHandler struct {
	pr post.Repository
}

func NewPostsGameHandler(pr post.Repository) PostsGameHandler {
	return PostsGameHandler{pr: pr}
}

func (h PostsGameHandler) Handle(ctx context.Context, query PostsGame) ([]*post.Post, error) {

	posts, err := h.pr.PostsGame(ctx, query.Principal, query.Cursor, query.Slug, query.Seed)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
