package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"

	"github.com/pkg/errors"
	"overdoll/libraries/principal"
)

type RemovePost struct {
	Principal             *principal.Principal
	PostId                string
	PostRejectionReasonId string
	Notes                 *string
}

type RemovePostHandler struct {
	pr    post_audit_log.Repository
	eva   EvaService
	sting StingService
}

func NewRemovePostHandler(pr post_audit_log.Repository, eva EvaService, sting StingService) RemovePostHandler {
	return RemovePostHandler{sting: sting, eva: eva, pr: pr}
}

func (h RemovePostHandler) Handle(ctx context.Context, cmd RemovePost) (*post_audit_log.PostAuditLog, error) {

	_, postContributorId, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return nil, errors.Wrap(err, "failed to get post")
	}

	rejectionReason, err := h.pr.GetPostRejectionReason(ctx, cmd.Principal, cmd.PostRejectionReasonId)

	if err != nil {
		return nil, err
	}

	postAuditLog, err := post_audit_log.NewRemovePostAuditLog(
		cmd.Principal,
		cmd.PostId,
		postContributorId,
		rejectionReason,
		cmd.Notes,
	)

	if err != nil {
		return nil, err
	}

	// create audit log record
	if err := h.pr.CreatePostAuditLog(ctx, postAuditLog); err != nil {
		return nil, err
	}

	return postAuditLog, nil
}
