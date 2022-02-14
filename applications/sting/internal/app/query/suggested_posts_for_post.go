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
	pr     post.Repository
	pi     post.IndexRepository
	stella StellaService
}

func NewSuggestedPostsForPostHandler(pr post.Repository, pi post.IndexRepository, stella StellaService) SuggestedPostsForPostHandler {
	return SuggestedPostsForPostHandler{pi: pi, pr: pr, stella: stella}
}

func (h SuggestedPostsForPostHandler) Handle(ctx context.Context, query SuggestedPostsForPost) ([]*post.Post, error) {

	pst, err := h.pr.GetPostById(ctx, query.Principal, query.PostId)

	if err != nil {
		return nil, err
	}

	filters, err := post.NewSuggestedPostsByPost(pst)

	if err != nil {
		return nil, err
	}

	posts, err := h.pi.SearchPosts(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
