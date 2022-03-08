package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/event"
	"overdoll/applications/parley/internal/domain/moderator"
	"overdoll/applications/parley/internal/domain/post_audit_log"

	"github.com/pkg/errors"
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
	eva   EvaService
	sting StingService
}

func NewApprovePostHandler(pr post_audit_log.Repository, mr moderator.Repository, event event.Repository, eva EvaService, sting StingService) ApprovePostHandler {
	return ApprovePostHandler{sting: sting, eva: eva, pr: pr, mr: mr, event: event}
}

func (h ApprovePostHandler) Handle(ctx context.Context, cmd ApprovePost) error {

	_, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return errors.Wrap(err, "failed to get post")
	}

	postModerator, err := h.mr.GetPostModeratorByPostId(ctx, cmd.Principal, cmd.PostId)

	if err != nil {
		return err
	}

	if err := postModerator.CanApprovePost(cmd.Principal); err != nil {
		return err
	}

	if err := h.event.ApprovePost(ctx, cmd.Principal, cmd.PostId); err != nil {
		return err
	}

	return nil
}
