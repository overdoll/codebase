package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type LikePost struct {
	Principal *principal.Principal
	PostId    string
}

type LikePostHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewLikePostHandler(pr post.Repository, event event.Repository) LikePostHandler {
	return LikePostHandler{pr: pr, event: event}
}

func (h LikePostHandler) Handle(ctx context.Context, cmd LikePost) (*post.Like, error) {

	pst, err := h.pr.GetPostById(ctx, cmd.Principal, cmd.PostId)

	if err != nil {
		return nil, err
	}

	newLike, err := post.NewLike(cmd.Principal, pst)

	if err != nil {
		return nil, err
	}

	// create a new post like
	if err := h.pr.CreatePostLike(ctx, cmd.Principal, newLike); err != nil {
		return nil, err
	}

	if err := h.event.AddPostLike(ctx, cmd.PostId, cmd.Principal.AccountId()); err != nil {
		return nil, err
	}

	return newLike, nil
}
