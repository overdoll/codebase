package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/libraries/principal"

	"overdoll/applications/sting/internal/domain/post"
)

type UnArchivePost struct {
	Principal *principal.Principal
	PostId    string
}

type UnArchivePostHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewUnArchivePostHandler(pr post.Repository, event event.Repository) UnArchivePostHandler {
	return UnArchivePostHandler{pr: pr, event: event}
}

func (h UnArchivePostHandler) Handle(ctx context.Context, cmd UnArchivePost) (*post.Post, error) {

	pst, err := h.pr.GetPostById(ctx, cmd.Principal, cmd.PostId)

	if err != nil {
		return nil, err
	}

	if err := h.event.UnArchivePost(ctx, cmd.Principal, pst); err != nil {
		return nil, err
	}

	return pst, nil
}
