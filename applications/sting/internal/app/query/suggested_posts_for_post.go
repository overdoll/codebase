package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SuggestedPostsForPost struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	PostId    string
}

type SuggestedPostsForPostHandler struct {
	pr post.Repository
}

func NewSuggestedPostsForPostHandler(pr post.Repository) SuggestedPostsForPostHandler {
	return SuggestedPostsForPostHandler{pr: pr}
}

func (h SuggestedPostsForPostHandler) Handle(ctx context.Context, query SuggestedPostsForPost) ([]*post.Post, error) {

	pst, err := h.pr.GetPostById(ctx, query.Principal, query.PostId)

	if err != nil {
		return nil, err
	}

	posts, err := h.pr.SuggestedPostsByPost(ctx, query.Principal, query.Cursor, pst)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
