package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type UndoLikePost struct {
	Principal *principal.Principal
	PostId    string
}

type UndoLikePostHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewUndoLikePostHandler(pr post.Repository, event event.Repository) UndoLikePostHandler {
	return UndoLikePostHandler{pr: pr, event: event}
}

func (h UndoLikePostHandler) Handle(ctx context.Context, cmd UndoLikePost) error {

	pst, err := h.pr.GetPostById(ctx, cmd.Principal, cmd.PostId)

	if err != nil {
		return err
	}

	postLike, err := h.pr.GetPostLikeById(ctx, cmd.Principal, pst.ID(), cmd.Principal.AccountId())

	if err != nil {
		return err
	}

	if err := h.event.RemovePostLike(ctx, postLike); err != nil {
		return err
	}

	return nil
}
