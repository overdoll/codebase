package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/libraries/principal"

	"overdoll/applications/sting/internal/domain/post"
)

type DeletePost struct {
	Principal *principal.Principal
	PostId    string
}

type DeletePostHandler struct {
	pi    post.IndexRepository
	pr    post.Repository
	event event.Repository
}

func NewDeletePostHandler(pr post.Repository, pi post.IndexRepository, event event.Repository) DeletePostHandler {
	return DeletePostHandler{pr: pr, pi: pi, event: event}
}

func (h DeletePostHandler) Handle(ctx context.Context, cmd DeletePost) error {

	pst, err := h.pr.GetPostById(ctx, cmd.Principal, cmd.PostId)

	if err != nil {
		return err
	}

	if err := pst.CanDelete(cmd.Principal); err != nil {
		return err
	}

	if err := h.event.DeletePost(ctx, pst.ID()); err != nil {
		return err
	}

	return nil
}
