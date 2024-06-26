package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/event"
	"overdoll/applications/parley/internal/domain/moderator"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/libraries/errors/domainerror"

	"overdoll/libraries/principal"
)

type ApprovePost struct {
	Principal *principal.Principal
	PostId    string
}

type ApprovePostHandler struct {
	pr    post_audit_log.Repository
	mr    moderator.Repository
	event event.Repository
	sting StingService
}

func NewApprovePostHandler(pr post_audit_log.Repository, mr moderator.Repository, event event.Repository, sting StingService) ApprovePostHandler {
	return ApprovePostHandler{sting: sting, pr: pr, mr: mr, event: event}
}

func (h ApprovePostHandler) Handle(ctx context.Context, cmd ApprovePost) error {

	pst, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return err
	}

	postModerator, err := h.mr.GetPostModeratorByPostId(ctx, cmd.Principal, cmd.PostId)

	if err != nil {
		return err
	}

	if pst.HasCharacterRequests() {
		return domainerror.NewValidation("cannot approve post with character requests")
	}

	if err := h.event.ApprovePost(ctx, cmd.Principal, postModerator, cmd.PostId); err != nil {
		return err
	}

	return nil
}
