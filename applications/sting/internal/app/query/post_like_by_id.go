package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type PostLikeById struct {
	Principal *principal.Principal
	PostId    string
	AccountId string
}

type PostLikeByIdHandler struct {
	pr post.Repository
}

func NewPostLikeByIdHandler(pr post.Repository) PostLikeByIdHandler {
	return PostLikeByIdHandler{pr: pr}
}

func (h PostLikeByIdHandler) Handle(ctx context.Context, query PostLikeById) (*post.Like, error) {

	result, err := h.pr.GetPostLikeById(ctx, query.Principal, query.PostId, query.AccountId)

	if err != nil {
		return nil, err
	}

	return result, nil
}
