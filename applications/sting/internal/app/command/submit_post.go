package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"time"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type SubmitPost struct {
	Principal *principal.Principal
	PostId    string
}

type SubmitPostHandler struct {
	pr     post.Repository
	event  event.Repository
	loader LoaderService
}

func NewSubmitPostHandler(pr post.Repository, event event.Repository, loader LoaderService) SubmitPostHandler {
	return SubmitPostHandler{pr: pr, event: event, loader: loader}
}

func (h SubmitPostHandler) Handle(ctx context.Context, cmd SubmitPost) (*post.Post, error) {

	pst, err := h.pr.GetPostById(ctx, cmd.Principal, cmd.PostId)

	if err != nil {
		return nil, err
	}

	allProcessed, err := h.loader.AllResourcesProcessed(ctx, pst.ID(), pst.AllContentResourceIds())

	if err != nil {
		return nil, err
	}

	if err := pst.SubmitPostRequest(cmd.Principal, allProcessed); err != nil {
		return nil, err
	}

	if err != nil {
		return nil, err
	}

	if err := h.event.SubmitPost(ctx, cmd.Principal, pst, time.Now()); err != nil {
		return nil, err
	}

	return pst, nil
}
