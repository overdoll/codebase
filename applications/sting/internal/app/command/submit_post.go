package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
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
	pr    post.Repository
	cr    club.Repository
	event event.Repository
}

func NewSubmitPostHandler(pr post.Repository, cr club.Repository, event event.Repository) SubmitPostHandler {
	return SubmitPostHandler{pr: pr, cr: cr, event: event}
}

func (h SubmitPostHandler) Handle(ctx context.Context, cmd SubmitPost) (*post.Post, error) {

	pst, err := h.pr.GetPostById(ctx, cmd.Principal, cmd.PostId)

	if err != nil {
		return nil, err
	}

	clb, err := h.cr.GetClubById(ctx, pst.ClubId())

	if err != nil {
		return nil, err
	}

	if err := pst.SubmitPostRequest(clb, cmd.Principal); err != nil {
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
