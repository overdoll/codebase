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
	pi    post.IndexRepository
	pr    post.Repository
	event event.Repository
}

func NewUnArchivePostHandler(pr post.Repository, pi post.IndexRepository, event event.Repository) UnArchivePostHandler {
	return UnArchivePostHandler{pr: pr, pi: pi, event: event}
}

func (h UnArchivePostHandler) Handle(ctx context.Context, cmd ArchivePost) (*post.Post, error) {

	pst, err := h.pr.GetPostById(ctx, cmd.Principal, cmd.PostId)

	if err != nil {
		return nil, err
	}

	if err := pst.CanUnArchive(cmd.Principal); err != nil {
		return nil, err
	}

	if err := h.event.UnArchivePost(ctx, pst.ID()); err != nil {
		return nil, err
	}

	return pst, nil
}
