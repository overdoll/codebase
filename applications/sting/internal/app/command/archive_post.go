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
	pi    post.IndexRepository
	pr    post.Repository
	event event.Repository
}

func NewArchivePostHandler(pr post.Repository, pi post.IndexRepository, event event.Repository) ArchivePostHandler {
	return ArchivePostHandler{pr: pr, pi: pi, event: event}
}

func (h ArchivePostHandler) Handle(ctx context.Context, cmd ArchivePost) (*post.Post, error) {

	pst, err := h.pr.GetPostById(ctx, cmd.Principal, cmd.PostId)

	if err != nil {
		return nil, err
	}

	if err := pst.CanArchive(cmd.Principal); err != nil {
		return nil, err
	}

	if err := h.event.ArchivePost(ctx, pst.ID()); err != nil {
		return nil, err
	}

	return pst, nil
}
