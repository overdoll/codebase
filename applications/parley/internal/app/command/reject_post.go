package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"

	"github.com/pkg/errors"
	"overdoll/libraries/principal"
)

type RejectPost struct {
	Principal *principal.Principal
	PostId    string
	// optional
	PostRejectionReasonId string
	Notes                 *string
}

type RejectPostHandler struct {
	pr    post_audit_log.Repository
	eva   EvaService
	sting StingService
}

func NewRejectPostHandler(pr post_audit_log.Repository, eva EvaService, sting StingService) RejectPostHandler {
	return RejectPostHandler{sting: sting, eva: eva, pr: pr}
}

func (h RejectPostHandler) Handle(ctx context.Context, cmd RejectPost) (*post_audit_log.PostAuditLog, error) {

	postModeratorId, _, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return nil, errors.Wrap(err, "failed to get post")
	}

	rejectionReason, err := h.pr.GetPostRejectionReasonById(ctx, cmd.Principal, cmd.PostRejectionReasonId)

	if err != nil {
		return nil, err
	}

	// create new audit log - all necessary permission checks will be performed
	postAuditLog, err := post_audit_log.NewRejectPostAuditLog(
		cmd.Principal,
		cmd.PostId,
		postModeratorId,
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
