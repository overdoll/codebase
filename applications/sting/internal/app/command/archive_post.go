package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/libraries/principal"

	"overdoll/applications/sting/internal/domain/post"
)

type ArchivePost struct {
	Principal *principal.Principal
	PostId    string
}

type ArchivePostHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewArchivePostHandler(pr post.Repository, event event.Repository) ArchivePostHandler {
	return ArchivePostHandler{pr: pr, event: event}
}

func (h ArchivePostHandler) Handle(ctx context.Context, cmd ArchivePost) (*post.Post, error) {

	pst, err := h.pr.GetPostById(ctx, cmd.Principal, cmd.PostId)

	if err != nil {
		return nil, err
	}

	if err := h.event.ArchivePost(ctx, cmd.Principal, pst); err != nil {
		return nil, err
	}

	return pst, nil
}
