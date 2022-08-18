package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type AccountLikedPosts struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	AccountId string
}

type AccountLikedPostsHandler struct {
	pr post.Repository
}

func NewAccountLikedPosts(pr post.Repository) AccountLikedPostsHandler {
	return AccountLikedPostsHandler{pr: pr}
}

func (h AccountLikedPostsHandler) Handle(ctx context.Context, query AccountLikedPosts) ([]*post.LikedPost, error) {

	result, err := h.pr.AccountPostLikes(ctx, query.Principal, query.Cursor, query.AccountId)

	if err != nil {
		return nil, err
	}

	return result, nil
}
